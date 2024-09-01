// import React from "react";
import { useEffect, useState } from "react";
import { FormGroup, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import tzUniversities from "../../Controllers/tanzanian_universities.json";

const OrderForm2 = ({formData, setFormData, errors, setErrors}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        // Filter the universities based on the search term
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
                            value={searchTerm || formData.universityName}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setErrors(prev => ({ ...prev, universityName: "" }));
                            }}
                            className="form-control"
                        />
                    </InputGroup>    
                    </FormGroup> 
                    {errors.universityName && (
                        <p className="mx-4 my-1 error" >
                        {errors.universityName}
                        </p>
                    )}
                    {showSearchResults && searchTerm && (
                        <ul className="searchResultsList" 
                            style={{ listStyleType: "none", padding: 0, margin: 0, border: "1px solid #ccc", borderRadius: "5px",maxWidth:" ", maxHeight: "150px", overflowY: "auto" }}>
                        {filteredUniversities.slice(0, 10).map(university => (
                            <li
                            key={university.name}
                            style={{ cursor: "pointer", padding: "5px 10px" }}
                            onClick={() => handleSelectUniversity(university.name)}
                            >
                            {university.name}
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                </div>
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
                    {errors.universityCourse && <p className="mx-4 my-1 error" >{errors.universityCourse}</p>}
                    </div>
                </div>            

  
            </div>
            
      </div>
    );
}

export default OrderForm2;