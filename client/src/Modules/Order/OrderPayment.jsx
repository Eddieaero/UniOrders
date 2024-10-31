import { useState } from "react";
import { useLocation } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router";
import axiosInstance from "../../Controllers/axiosInstance";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import tag1 from "../../assets/nametag1.svg";
import Swal from 'sweetalert2';

    const OrderPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {formData} = location.state;
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    const handlePayment = async () => {
        let timerInterval;
        
        // Start the loading alert with a timer
        Swal.fire({
            title: "Processing Payment...",
            html: "Please wait while we confirm your payment.",
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    if (timer) {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }
                }, 1000);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        });
    
        try {
            // Initiate payment request
            const paymentResponse = await axiosInstance.post('/initiate-payment', {
                buyer_name: `${formData.firstName} ${formData.lastName}`,
                buyer_phone: formData.paymentNumber,
                buyer_email: "firstedson@gmail.com",
                amount: formData.amount,
                transactionRef: formData.orderId,
            });

            setPaymentInitiated(true); 

            await new Promise(resolve => setTimeout(resolve, 60000));

            const confirmationResponse = await axiosInstance.post('/confirm-payment', {
                order_id: paymentResponse.data.order_id, // Assuming `order_id` is returned from payment initiation
                transactionRef: formData.orderId,
            });
    
            // Check the response from the payment API
            if (confirmationResponse.data.status === "success") {  // Replace "success" with the correct key from ZenoPay API
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment Confirmed...",
                    html: "Your payment was successful. Redirecting...",
                    showConfirmButton: false,
                    timer: 4000  // Auto-close after 2 seconds
                }).then(() => {
                    navigate("/"); // Redirect user to home after successful payment
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Payment Failed",
                    html: confirmationResponse.data.message || "There was an issue with your payment. Please try again.",
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.error("Error during payment process:", error);
    
            // Display the error alert
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Payment initiation failed",
                html: error.response?.data?.message || "There was an issue processing your payment.",
                showConfirmButton: true
            });
        }
    };
    

    return(
    <div >
        <NavBar/>
        <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="order-complete flex">
                <h5>Congratulations !</h5>
                <p>Your Order is saved</p>
            </div>

            {paymentInitiated && (
                <div className="order-complete flex">
                    <h5>Payment Initiated !!</h5>
                    <p>Ready for Payment</p>
                </div>
            )}

            <div className="order-form " style={{display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                <div className="col-lg-5" style={{display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                    <img className="tag-image d-none d-md-flex" src={tag1}/>
                </div>
                <div className="col-lg-7 col-sm-5  flex" style={{display: "flex-row",flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div>
                        <h4>Order Details</h4>
                    </div>
                    <div className="flex" style={{ display: "flex", justifyContent: "space-evenly", width: "auto" }}>
                        <div className="data-column col-sm-6" style={{}}>
                            <p>Order ID:<p className="labels col-sm-6">{formData.orderId}</p></p>
                            <p>First Name:<p className="labels col-sm-8">{formData.firstName}</p></p>
                            <p>Last Name: <p className="labels col-sm-8">{formData.lastName}</p></p>
                            <p>Sash Color: <p className="labels col-sm-6">{formData.sashColor}</p></p>
                        </div>
                        <div  className="data-column col-sm-6" style={{}}>
                            <p>University Name: <p className="labels col-sm-8">{formData.universityName}</p></p>
                            <p>University Course: <p className="labels col-sm-8">{formData.universityCourse}</p></p>
                            <p>Payment Number: <p className="labels col-sm-6">{formData.paymentNumber}</p></p>
                            <p>Payment Amount: <p className="labels col-sm-6">20,000/=</p></p>
                        </div>
                    </div>
                    <div>
                        <button className="foot-button-next" onClick={handlePayment}>Pay</button>
                    </div>
                    <div>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    )
}

export default OrderPayment