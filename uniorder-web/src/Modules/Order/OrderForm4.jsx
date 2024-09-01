// import react from 'react';
import { FormGroup, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const OrderForm4 = ({formData, setFormData, errors, setErrors }) => {  
    const validatePhoneNumber = (number) => {
        const phoneRegex = /^(07|06)[0-9]{8}$/;
        return phoneRegex.test(number);
      };
    
    return (
        <div>
            <h1>Payment Info</h1>
            <div className="form-group m-lg-1 flex">
            <label>Enter your Payment Number</label>
            <FormGroup>
             <InputGroup>
                <Form.Control
                    type="text"
                    value={formData.paymentNumber}
                    onChange={(event) => {
                        setFormData({ ...formData, paymentNumber: event.target.value });
                        setErrors(prev => ({ ...prev, paymentNumber: "" }));
                    }}
                    className="form-control"
                />
             </InputGroup>
            </FormGroup>
            {errors.paymentNumber && <p className="error" >{errors.paymentNumber}</p>}
            </div>
        </div>
    );
    
}

export default OrderForm4