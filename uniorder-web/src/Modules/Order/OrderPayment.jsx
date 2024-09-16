import { useLocation } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import tag1 from "../../assets/nametag1.svg";
import Swal from 'sweetalert2';

    const OrderPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {formData} = location.state;

    const handlePayment = async () => {
        try {
            const paymentResponse = await axios.post('http://localhost:5000/initiate-payment', {
                msisdn: formData.paymentNumber,
                channel: formData.channel,
                amount: 20000,
                narration: `Payment for Order ${formData.orderId}`,
                transactionRef: formData.orderId,
                transactionDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                callbackUrl: 'http://localhost:5000/payment-callback' // You can adjust this to your actual callback URL
            });

            if (paymentResponse.data.statusCode === "PENDING_ACK") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment Confirmed...",
                    showConfirmButton: true
                }).then(() => {
                    navigate("/"); // Redirect user to home after successful initiation
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Payment initiation failed",
                    showConfirmButton: true
                });
            }
        } catch (error) {
            console.error("Error during payment process:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Payment initiation failed",
                text: "There was an issue processing your payment.",
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