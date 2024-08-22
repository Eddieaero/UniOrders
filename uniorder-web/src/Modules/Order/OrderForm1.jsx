import {useState, useEffect } from "react";

const OrderForm1 = ({formData, setFormData, errors, setErrors}) => {
  return (
    <div>
      <h3>Tell us your full name and available phone number</h3>
      <div>
      <div className="form-group m-1 flex">
        <label className="p-lg-2">First Name</label>
      </div>
      <div>
        <input type="text"
               value={formData.firstName}
               onChange={(event) => {
                 setFormData({ ...formData, firstName: event.target.value });
                 setErrors(prev => ({ ...prev, firstName: "" }));
               }}
               style={{ borderRadius: "5px", border: "none", borderBottom: "2px solid #000" }}/>
        {errors.firstName && <p className="mx-4 my-1 error" style={{alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da"}}>{errors.firstName}</p>}
      </div>

        <div className="form-group m-lg-1 flex">
          <label className="p-lg-2">Last Name</label>
        </div>
        <div>
        <input type="text"
               value={formData.lastName}
               onChange={(event) => {
                 setFormData({ ...formData, lastName: event.target.value });
                 setErrors(prev => ({ ...prev, lastName: "" }));
               }}
               style={{ borderRadius: "5px", border: "none", borderBottom: "2px solid #000" }}/>
        {errors.lastName && <p className="mx-4 my-1 error"  style={{alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da"}}>{errors.lastName}</p>}
        </div>
        <div className="form-group m-lg-1 flex">
            <label className="p-lg-2">phone No</label>
        </div>
        <div>
        <input type="text"
               value={formData.availablePhone}
               onChange={(event) => {
                 setFormData({ ...formData, availablePhone: event.target.value });
                 setErrors(prev => ({ ...prev, availablePhone: "" }));
               }}
               style={{ borderRadius: "5px", border: "none", borderBottom: "2px solid #000" }}/>
        {errors.availablePhone && <p className="mx-4 my-1 error"  style={{alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da"}}>{errors.availablePhone}</p>}
      </div>
      </div>
    </div>
  );
}   
export default OrderForm1;