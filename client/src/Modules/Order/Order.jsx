import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../Controllers/axiosInstance";
import { v4 as uuidv4 } from "uuid";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import OrderForm1 from "./OrderForm1";
import OrderForm2 from "./OrderForm2";
import OrderForm3 from "./OrderForm3";
import OrderForm4 from "./OrderForm4";
import OrderForm5 from "./OrderForm5";
import tag1 from "../../assets/nametag1.svg";
import tag2 from "../../assets/nametag2.svg";
import tag3 from "../../assets/nametag3.svg";
import tag4 from "../../assets/nametag4.svg";
import tag5 from "../../assets/nametag5.svg";

const Order = () => {
    const generateSimpleUUID = () => uuidv4().slice(0, 6);


    const [page, setPage] = useState(0);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" }); // New state for messages
    const navigate = useNavigate();
    const formTitles = ["Full Name", "University Info","Quote Section","Sash color", "Payment Info"];
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        availablePhone: "",
        universityName: "",
        universityCourse: "",
        sashColor: "",
        paymentNumber: "",
        orderId: generateSimpleUUID(),
        OrderDate: new Date().toLocaleDateString('en-CA', {
            timeZone: 'Africa/Nairobi'
        }), // Format: YYYY-MM-DD
        amount: 1000,
        OrderStatus: "Unpaid",
        universityImage: null,
        quote: "",
        logo_url: null,
    });
    



    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === "universityImage" && formData[key]) {
                    formDataToSend.append(key, formData[key]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await axiosInstance.post("/create-order", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const createdOrder = response.data;

            if (createdOrder.fileURL) {
                setFormData((prevData) => ({
                    ...prevData,
                    logoUrl: createdOrder.fileURL // Update logoUrl in formData
                }));
            }
            
            navigate("/payment", { state: { formData } });
            setMessage({
                text: "Congratulations! Your order is saved.",
                type: "success"
            });
            console.log("Order saved successfully", response.data);
        } catch (error) {
            console.log("Error:", error);
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
        } 
         else if (currentPage === 3) { // OrderForm3
            if (!formData.sashColor) {
                newErrors.sashColor = "Sash color selection is required.";
                isValid = false;
            } else {
                newErrors.sashColor = "";
            }    
        
        } else if (currentPage === 4) { // OrderForm4
    
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
            case 4:
                return <OrderForm5 formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
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
            case 4:
                return <img src={tag5} className="tag-image" alt="tag5" />;
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