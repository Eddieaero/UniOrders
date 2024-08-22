// import React from "react";
// import { useEffect } from "react";
import { useLocation } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import tag1 from "../../assets/nametag1.svg";
import Swal from 'sweetalert2';

// const OrderPayment = ({formData, setFormData}) => {
    const OrderPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {formData} = location.state;


    const handlePayment = async () => {
        try {
            await axios.put(`http://localhost:5000/orders/${formData.orderId}/status`, {
                OrderStatus: "Paid"
            });
            Swal.fire({
                position: "center",
                icon: "success",
                backdrop: 'swal2-backdrop-show',
                title: "payment successful",
                showConfirmButton: true,
                // timer: 1500
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
                
            // alert("Payment successful! Order status has been updated.");

        } catch (error) {
            console.error("Error updating order status:", error);
            // alert("There was an issue processing the payment.");
            Swal.fire({
                position: "center",
                icon: "error",
                backdrop: 'swal2-backdrop-show',
                title: "Transaction failed",
                showConfirmButton: true,
                footer: 'Let\'s make a new order',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/order");
                }
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
                        <div className="data-column">
                            <p>Order ID:<p className="labels">{formData.orderId}</p></p>
                            <p>First Name:<p className="labels">{formData.firstName}</p></p>
                            <p>Last Name: <p className="labels">{formData.lastName}</p></p>
                            <p>Sash Color: <p className="labels">{formData.sashColor}</p></p>
                        </div>
                        <div className="data-column ">
                            <p>University Name: <p className="labels">{formData.universityName}</p></p>
                            <p>University Course: <p className="labels">{formData.universityCourse}</p></p>
                            <p>Payment Number: <p className="labels">{formData.paymentNumber}</p></p>
                            <p>Payment Amount: <p className="labels">20,000/=</p></p>
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