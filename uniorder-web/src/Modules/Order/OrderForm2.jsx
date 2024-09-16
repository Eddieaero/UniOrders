import React, { useEffect, useState } from "react";
import { FormGroup, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import tzUniversities from "../../Controllers/tanzanian_universities.json";

const OrderForm2 = ({ formData, setFormData, errors, setErrors }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isOtherSelected, setIsOtherSelected] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            const results = tzUniversities.filter(university =>
                university.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUniversities(results);
            setShowSearchResults(true);
        } else {
            setFilteredUniversities([]);
            setShowSearchResults(false);
        }
    }, [searchTerm]);

    const handleSelectUniversity = (universityName) => {
        setFormData({ ...formData, universityName: universityName });
        setErrors(prev => ({ ...prev, universityName: "" }));
        setShowSearchResults(false);
        setSearchTerm("");  // Reset the search term after selection
        setIsOtherSelected(false); // Reset if "Other" was selected
    };

    const handleOtherSelected = () => {
        setIsOtherSelected(true);
        setFormData({ ...formData, universityName: "" }); // Clear the university name
    };

    return (
        <div>
            <h3>Enter your University Information</h3>
            <div>
                <div className="form-group m-4">
                    <div>
                        <FormGroup>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Search for a university"
                                    value={isOtherSelected ? "" : (searchTerm || formData.universityName)}
                                    onChange={(event) => {
                                        setSearchTerm(event.target.value);
                                        setErrors(prev => ({ ...prev, universityName: "" }));
                                    }}
                                    disabled={isOtherSelected}  // Disable when "Other" is selected
                                    className="form-control"
                                />
                            </InputGroup>
                        </FormGroup>
                        {errors.universityName && (
                            <p className="mx-4 my-1 error">
                                {errors.universityName}
                            </p>
                        )}
                        {showSearchResults && searchTerm && (
                            <ul className="searchResultsList"
                                style={{ listStyleType: "none", padding: 0, margin: 0, border: "1px solid #ccc", borderRadius: "5px", maxHeight: "150px", overflowY: "auto" }}>
                                {filteredUniversities.slice(0, 10).map(university => (
                                    <li
                                        key={university.name}
                                        style={{ cursor: "pointer", padding: "5px 10px" }}
                                        onClick={() => handleSelectUniversity(university.name)}
                                    >
                                        {university.name}
                                    </li>
                                ))}
                                <li
                                    style={{ cursor: "pointer", padding: "5px 10px", fontStyle: "italic" }}
                                    onClick={handleOtherSelected}
                                >
                                    Other (Enter your institution)
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                {/* Conditionally show the "Other" input field if it's selected */}
                {isOtherSelected && (
                    <div className="form-group m-4">
                        <FormGroup>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your institution name"
                                    value={formData.universityName}
                                    onChange={(event) => {
                                        setFormData({ ...formData, universityName: event.target.value });
                                        setErrors(prev => ({ ...prev, universityName: "" }));
                                    }}
                                    className="form-control"
                                />
                            </InputGroup>
                        </FormGroup>
                    </div>
                )}

                <div className="form-group m-4">
                    <div>
                        <FormGroup>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="University Course"
                                    value={formData.universityCourse}
                                    onChange={(event) => {
                                        setFormData({ ...formData, universityCourse: event.target.value });
                                        setErrors(prev => ({ ...prev, universityCourse: "" }));
                                    }}
                                    className="form-control"
                                />
                            </InputGroup>
                        </FormGroup>
                        {errors.universityCourse && <p className="mx-4 my-1 error">{errors.universityCourse}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm2;
