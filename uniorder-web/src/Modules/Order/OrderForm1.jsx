import {useState, useEffect } from "react";
import { FormGroup, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const OrderForm1 = ({formData, setFormData, errors, setErrors}) => {
  return (
    <div>
      <h3>Tell us your full name and available phone number</h3>
      <div>
        <div className="form-group m-4">
          {/* <div className="form-group m-1 flex">
          <label className="p-lg-2">First Name</label>
          </div> */}
          <div>
            <FormGroup>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(event) => {
                    setFormData({ ...formData, firstName: event.target.value });
                    setErrors(prev => ({ ...prev, firstName: "" }));
                  }}
                  className="form-Input"
                />
              </InputGroup>
            </FormGroup>
            {errors.firstName && <p className="mx-4 my-1 error" style={{}}>{errors.firstName}</p>}
          </div> 
        </div>   
        <div className="form-group m-4">
          {/* <div className="form-group m-lg-1 flex">
            <label className="p-lg-2">Last Name</label>
          </div> */}
          <div>
          <FormGroup>
            <InputGroup>
            </InputGroup>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(event) => {
                  setFormData({ ...formData, lastName: event.target.value });
                  setErrors(prev => ({ ...prev, lastName: "" }));
                }}
                className="form-Input"
              />
          </FormGroup> 
          {errors.lastName && <p className="mx-4 my-1 error"  style={{}}>{errors.lastName}</p>}  
          </div>
        </div>
        <div className="form-group m-4">
          {/* <div className="form-group m-lg-1 flex">
              <label className="p-lg-2">phone No</label>
          </div> */}
          <div>
          <FormGroup>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Available phone number"
                value={formData.availablePhone}
                onChange={(event) => {
                  setFormData({ ...formData, availablePhone: event.target.value });
                  setErrors(prev => ({ ...prev, availablePhone: "" }));
                }}
                className="form-Input"
              />
            </InputGroup>
          </FormGroup>
          {errors.availablePhone && <p className="mx-4 my-1 error"  style={{}}>{errors.availablePhone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}   
export default OrderForm1;