// import React from "react";

const OrderForm2 = ({formData, setFormData, errors, setErrors}) => {

    return (
        <div>
            <h3>Enter your University Information</h3>
            <div>
                <div className="form-group m-lg-1 flex" style={{ }}>
                    <label className="p-lg-2">University name</label>
                </div>
                <div>
                <input type="text"
                    value={formData.universityName}
                    onChange={(event) => {
                        setFormData({ ...formData, universityName: event.target.value });
                        setErrors(prev => ({ ...prev, universityName: "" }));
                    }}
                    style={{ borderRadius: "5px", border: "none", borderBottom: "2px solid #000" }}/>
                    {errors.universityName && <p className="mx-4 my-1 error" style={{alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da"}}>{errors.universityName}</p>}
                </div>
                <div className="form-group m-lg-1" style={{}}>
                    <label className="p-lg-2">Course</label>
                </div>
                <div>
                <input type="text"
                    value={formData.universityCourse}
                    onChange={(event) => {
                        setFormData({ ...formData, universityCourse: event.target.value });
                        setErrors(prev => ({ ...prev, universityCourse: "" }));
                    }}
                    style={{ borderRadius: "5px", border: "none", borderBottom: "2px solid #000" }}/>
                    {errors.universityCourse && <p className="mx-4 my-1 error" style={{alignItems: "center", display: "flex", padding: "5px", borderRadius: "5px", border: "1px solid #f5c6cb", color: "#721c24", backgroundColor: "#f8d7da"}}>{errors.universityCourse}</p>}
                </div>
            </div>
            
      </div>
    );
}

export default OrderForm2;