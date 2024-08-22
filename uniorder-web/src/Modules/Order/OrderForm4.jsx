// import react from 'react';


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
            <input type="text"
                value={formData.paymentNumber}
                onChange={(event) => {
                    setFormData({ ...formData, paymentNumber: event.target.value });
                    setErrors(prev => ({ ...prev, paymentNumber: "" }));
                }}
                style={{ borderRadius: "5px", border: "none", borderBottom: "2px solid #000" }}/>
            {errors.paymentNumber && <p className="error" style={{alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da"}}>{errors.paymentNumber}</p>}
            </div>
        </div>
    );
    
}

export default OrderForm4