import { useState } from "react";

const OrderForm3 = ({ formData, setFormData, errors, setErrors }) => {
        const handleQuoteChange = (event) => {
                const quote = event.target.value;
                const wordCount = quote.trim().split(/\s+/).length;
        
                if (wordCount > 30) {
                    setErrors(prev => ({ ...prev, quote: "Quote cannot exceed 30 words." }));
                } else {
                    setErrors(prev => ({ ...prev, quote: "" }));
                    setFormData({ ...formData, quote });
                }
            };

    return (
        <div>
            <div className="form-group m-lg-1 flex">
                <h3>Add your favorite Quote</h3>
                <p>(Optional)</p>
                <div className="display-flex m-lg-1 ">
                    <textarea
                        type="text"
                        value={formData.quote || ""}
                        onChange={handleQuoteChange}
                        placeholder="Type here (20 words max)"
                        className="form-control "
                    />
                </div>
                {errors.quote && (
                    <p className="error" style={{ alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da" }}>
                        {errors.quote}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OrderForm3;