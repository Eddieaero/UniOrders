import { useState } from "react";
import { FormGroup, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const providerToChannelMap = {
    "Airtel": "TZ-AIRTEL-C2B",
    "Tigo": "TZ-TIGO-C2B",
    "Halotel": "TZ-HALOTEL-C2B"
};

const prefixToProviderMap = {
    "68": "Airtel",
    "69": "Airtel",
    "78": "Airtel",
    "71": "Tigo",
    "65": "Tigo",
    "67": "Tigo",
    "62": "Halotel",
    "77": "Halotel"
};

const OrderForm4 = ({ formData, setFormData, errors, setErrors }) => {
    const [detectedProvider, setDetectedProvider] = useState("");

    const formatPhoneNumber = (number) => {
        let sanitizedNumber = number.replace(/\D/g, ''); // Remove all non-numeric characters
        if (!sanitizedNumber.startsWith('255')) {
            if (sanitizedNumber.startsWith('0')) {
                sanitizedNumber = sanitizedNumber.substring(1); // Remove leading zero
            }
            sanitizedNumber = `255${sanitizedNumber}`; // Add country code
        }
        return `+${sanitizedNumber}`;
    };

    const detectProvider = (number) => {
        const parsedNumber = parsePhoneNumberFromString(number, 'TZ');
        if (!parsedNumber) return null;

        const nationalNumber = parsedNumber.nationalNumber;
        const prefix = nationalNumber.substring(0, 2);

        return prefixToProviderMap[prefix] || null;
    };

    const handlePaymentNumberChange = (event) => {
        const inputNumber = event.target.value;
        const formattedNumber = formatPhoneNumber(inputNumber);

        const parsedNumber = parsePhoneNumberFromString(formattedNumber, 'TZ');
        if (parsedNumber) {
            const nationalNumber = parsedNumber.nationalNumber;

            // Check if the national number has exactly 9 digits
            if (nationalNumber.length !== 9) {
                setDetectedProvider("");
                setFormData({ ...formData, paymentNumber: formattedNumber, channel: "" });
                setErrors(prev => ({ ...prev, paymentNumber: "invalid." }));
                return; // Exit early if validation fails
            }

            const provider = detectProvider(formattedNumber);

            if (provider && providerToChannelMap[provider]) {
                setDetectedProvider(provider);
                setFormData({ ...formData, paymentNumber: formattedNumber, channel: providerToChannelMap[provider] });
                setErrors(prev => ({ ...prev, paymentNumber: "" }));
            } else {
                setDetectedProvider("");
                setFormData({ ...formData, paymentNumber: formattedNumber, channel: "" });
                setErrors(prev => ({ ...prev, paymentNumber: "We support Airtel, Tigo, and Halotel only. Please change your payment number." }));
            }
        } else {
            setFormData({ ...formData, paymentNumber: formattedNumber, channel: "" });
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
                {detectedProvider && <p>{detectedProvider} network</p>}
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
