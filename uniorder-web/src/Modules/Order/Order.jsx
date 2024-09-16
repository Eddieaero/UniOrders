import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import OrderForm1 from "./OrderForm1";
import OrderForm2 from "./OrderForm2";
import OrderForm3 from "./OrderForm3";
import OrderForm4 from "./OrderForm4";
import tag1 from "../../assets/nametag1.svg";
import tag2 from "../../assets/nametag2.svg";
import tag3 from "../../assets/nametag3.svg";
import tag4 from "../../assets/nametag4.svg";

const Order = () => {
    const generateSimpleUUID = () => uuidv4().slice(0, 6);

    const [page, setPage] = useState(0);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" }); // New state for messages
    const navigate = useNavigate();
    const formTitles = ["Full Name", "University Info","Sash color", "Payment Info"];
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        availablePhone: "",
        universityName: "",
        universityCourse: "",
        sashColor: "",
        channel: "",
        paymentNumber: "",
        orderId: generateSimpleUUID(),
        OrderDate: new Date().toLocaleDateString('en-CA', {
            timeZone: 'Africa/Nairobi'
        }), // Format: YYYY-MM-DD
        amount: 20000,
        OrderStatus: "Unpaid",
    });



    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/orders", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigate("/payment", { state: { formData } });
            setMessage({
                text: "Congratulations! Your order is saved.",
                type: "success"
            });
            console.log("Order saved successfully", response.data);
        } catch (error) {
            console.log("Error:", error);
            // console.log("Error:", error.response.data); 
            setMessage({
                text: "Oops, sorry, something went wrong!",
                type: "error"
            });
        }
    };
    const validateCurrentPage = () => {
        const currentPage = page;
        let isValid = true;
        let newErrors = { ...errors };

        if (currentPage === 0) { // OrderForm1
            const phoneRegex = /^(07|06)[0-9]{8}$/;
            if (!formData.firstName) {
                newErrors.firstName = "First name is required.";
                isValid = false;
            } else {
                newErrors.firstName = "";
            }
            if (!formData.lastName) {
                newErrors.lastName = "Last name is required.";
                isValid = false;
            } else {
                newErrors.lastName = "";
            }
            
            if (!formData.availablePhone) {
                newErrors.availablePhone = "phone number is required.";
                isValid = false;
            } else if (!phoneRegex.test(formData.availablePhone)) {
                newErrors.availablePhone = "Phone number is Invalid.";
                isValid = false;
            } else {
                newErrors.availablePhone = "";
            }
        } else if (currentPage === 1) { // OrderForm2
            if (!formData.universityName) {
                newErrors.universityName = "University name is required.";
                isValid = false;
            } else {
                newErrors.universityName = "";
            }
            if (!formData.universityCourse) {
                newErrors.universityCourse = "Course is required.";
                isValid = false;
            } else {
                newErrors.universityCourse = "";
            }
        } else if (currentPage === 2) { // OrderForm3
            if (!formData.sashColor) {
                newErrors.sashColor = "Sash color selection is required.";
                isValid = false;
            } else {
                newErrors.sashColor = "";
            }
        
        } else if (currentPage === 3) { // OrderForm4
            if (!formData.channel) {
                newErrors.channel = "Your mobile network is required.";
                isValid = false;
            } else {
                newErrors.channel = "";
            }
    
            if (!formData.paymentNumber) {
                newErrors.paymentNumber = "Payment number is required.";
                isValid = false;
            } else {
                newErrors.paymentNumber = "";
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const pageDisplay = () => {
        switch (page) {
            case 0:
                return <OrderForm1 formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 1:
                return <OrderForm2 formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 2:
                return <OrderForm3 formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 3:
                return <OrderForm4 formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            default:
                return null;
        }
    };

    const tagDisplay = () => {
        switch (page) {
            case 0:
                return <img src={tag1} className="tag-image" alt="tag1" />;
            case 1:
                return <img src={tag2} className="tag-image" alt="tag2" />;
            case 2:
                return <img src={tag3} className="tag-image" alt="tag3" />;
            case 3:
                return <img src={tag4} className="tag-image" alt="tag4" />;
            default:
                return null;
        }
    };

    return (
        <div>
            <NavBar/>
            <div className="form ">          
                <div className="order-form " >
                    {message.text && (
                        <div className={` order-complete ${message.type}`}>
                            {/* <h5>{message.type === "success" ? "Congratulations!" : "Oops Sorry, something went wrong!"}</h5> */}
                            <p>{message.text}</p>
                        </div>
                    )}
                    <div className="col-lg-6  tagDisplay">
                        {tagDisplay()}
                    </div>
                    <div className="col-lg-6 p-lg-5 ">
                        <div className="form-container">
                            <div className="form-header">
                                <div className="progress-bar">
                                    <span style={{width: page == 0 ? "25%": page == 1 ? "50%": page ==2 ? "75%":"100%" }}></span>
                                </div>
                            </div>
                            <div className="form-body">
                                {/* <p>Sash Order</p>
                                <div className="form-title">
                                    <p>{formTitles[page]}</p>
                                </div> */}
                                <div className="m-lg-3 form-content">
                                    {pageDisplay()}
                                </div>
                            </div>
                            <div className="form-footer" style={{}}>
                                <button 
                                className={ `button ${page === 0 ? 'button-disabled' : ' foot-button-prev m-1'}` }
                                disabled={page == 0}
                                onClick={()=>{
                                    setPage((currPage)=>currPage - 1)
                                }}>prev</button>
                                {/* <button className="foot-button-next m-1"
                                    onClick={()=>{
                                        if (page === formTitles.length - 1) {
                                            handleSubmit();
                                            console.log(formData)
                                            // navigate("/payment")
                                            navigate("/payment", { state: { formData } });
                                            
                                        } else {
                                            setPage((currPage)=>currPage + 1)  
                                        }
                                    }}
                                >{page === formTitles.length - 1 ? "Finish" : "next"}</button> */}
                                <button
                                    className="foot-button-next m-lg-1"
                                    onClick={() => {
                                        if (page === formTitles.length - 1) {
                                            if (validateCurrentPage()) {
                                                handleSubmit();
                                                // navigate("/payment", { state: { formData } });
                                            }
                                        } else {
                                            if (validateCurrentPage()) {
                                                setPage(currPage => currPage + 1);
                                            }
                                        }
                                    }}
                                >
                                    {page === formTitles.length - 1 ? "Finish" : "Next"}
                                </button>
                                {/* <div className="m-4 p-2" style={{width:"250px", height: "100px", borderRadius: "12px", color: "#AE8625", backgroundColor: "rgba(174, 134, 37, 0.17)"}}>
                                    <p style={{fontWeight:"bold"}}>Note..</p>
                                    <p style={{marginTop:"-10px"}}>Write exact details as they
                                        would appear on your sash</p>
                                </div> */}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}   

export default Order;