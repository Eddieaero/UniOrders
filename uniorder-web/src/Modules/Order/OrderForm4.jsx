import { useState } from "react";

const OrderForm4 = ({formData, setFormData, errors, setErrors }) => {
    const [selectedColor, setSelectedColor] = useState(formData.sashColor || '');
    // const [activeButton, setActiveButton] = useState();
    const handleButtonClick = (color) => {
        setSelectedColor(color);
        setFormData({ ...formData, sashColor: color });
        setErrors(prev => ({ ...prev, sashColor: "" }));
      };

    return (
        <div>
        {/* <h3>Sash color</h3> */}
            <div className="form-group m-lg-1 flex">
            <h3>Select your favorite Sash Color</h3>
                <div className="display-flex m-lg-1 ">
                    {/* <button className="m-1 sash-button sash-color-gold " */}
                    <button className={`sash-button m-lg-1 mx-1 sash-color-gold ${selectedColor === "gold" ? "active" : ""}`}
                            onClick={() => handleButtonClick('gold')}
                    ></button>
                    <button className={`sash-button m-lg-1 mx-1 sash-color-blue ${selectedColor === "blue" ? "active" : ""}`}
                            onClick={() => handleButtonClick('blue')}
                    ></button>
                    <button className={`sash-button m-lg-1 mx-1 sash-color-maroon ${selectedColor === "maroon" ? "active" : ""}`}
                            onClick={() => handleButtonClick('maroon')}
                    ></button>
                    <button className={`sash-button m-lg-1 mx-1 sash-color-white ${selectedColor === "white" ? "active" : ""}`}
                            onClick={() => handleButtonClick('white')}
                    ></button>
                    <button className={`sash-button m-lg-1 mx-1 sash-color-black ${selectedColor === "black" ? "active" : ""}`}
                            onClick={() => handleButtonClick('black')}
                    ></button>
                    <button className={`sash-button m-lg-1 mx-1 sash-color-baby-pink ${selectedColor === "baby-pink" ? "active" : ""}`}
                            onClick={() => handleButtonClick('baby-pink')}
                    ></button>
                </div>
                {errors.sashColor && 
                        <p className="error" 
                                style={{alignItems: "center", 
                                        display: "flex", 
                                        padding: "5px", 
                                        borderRadius: "5px", 
                                        border: "1px solid #f5c6cb", 
                                        color: "#721c24", 
                                        backgroundColor: "#f8d7da"}}>
                                        {errors.sashColor}
                        </p>}
            </div>
        </div>
    );
}

export default OrderForm4;