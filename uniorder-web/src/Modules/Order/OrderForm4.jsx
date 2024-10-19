import { useState } from "react";
import { FormGroup, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const OrderForm4 = ({ formData, setFormData, errors, setErrors }) => {



    const handlePaymentNumberChange = (event) => {
        const inputNumber = event.target.value;
        const sanitizedNumber = inputNumber.replace(/\D/g, ''); // Remove all non-numeric characters
    
        const parsedNumber = parsePhoneNumberFromString(sanitizedNumber, 'TZ'); // Try parsing the phone number as it is
    
        if (parsedNumber) {
            const nationalNumber = parsedNumber.nationalNumber;
    
            // Check if the national number has exactly 9 digits (for Tanzanian numbers)
            if (nationalNumber.length !== 9) {
                setFormData({ ...formData, paymentNumber: sanitizedNumber });
                setErrors(prev => ({ ...prev, paymentNumber: "Invalid phone number." }));
            } else {
                setFormData({ ...formData, paymentNumber: sanitizedNumber });
                setErrors(prev => ({ ...prev, paymentNumber: "" })); // Clear any errors
            }
    
        } else {
            setFormData({ ...formData, paymentNumber: sanitizedNumber });
            setErrors(prev => ({ ...prev, paymentNumber: "Invalid phone number format." }));
        }
    };
    

    return (
        <div>
            <h1>Payment Info</h1>
            <div className="form-group my-2">
                <FormGroup>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={formData.paymentNumber}
                            placeholder="Enter your Payment Number"
                            onChange={handlePaymentNumberChange}
                            className="form-control"
                        />
                    </InputGroup>
                </FormGroup>
                {errors.paymentNumber && <p className="error">{errors.paymentNumber}</p>}
            </div>
            <div className="p-1" style={{margin: "auto", width:"250px", height: "auto", borderRadius: "12px", color: "#AE8625", backgroundColor: "rgba(174, 134, 37, 0.17)"}}>
                <p style={{fontWeight:"bold"}}>Note..</p>
                <p style={{marginTop:"-10px"}}>Write exact details as they
                    would appear on your sash</p>
                <p style={{marginTop:"-10px"}}>You will be charged Tsh 20,000/=</p>
            </div>
        </div>
    );
};

export default OrderForm4;
