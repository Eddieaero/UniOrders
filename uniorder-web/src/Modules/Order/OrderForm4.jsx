import { useState, useEffect } from "react";
import { FormGroup, InputGroup } from "react-bootstrap";
import {DropdownButton, Dropdown} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import mobileNetworks from "../../Controllers/mobile_networks.json";

const OrderForm4 = ({formData, setFormData, errors, setErrors }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNetworks, setFilteredNetworks] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        // Filter the mobile networks based on the search term
        if (searchTerm) {
            const results = mobileNetworks.filter(network =>
                network.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNetworks(results);
            setShowSearchResults(true);
        } else {
            setFilteredNetworks([]);
            setShowSearchResults(false);
        }
    }, [searchTerm]);
 
    const handleSelectNetwork = (networkValue) => {
        setFormData({ ...formData, channel: networkValue });
        setErrors(prev => ({ ...prev, channel: "" }));
        setShowSearchResults(false);
        setSearchTerm("");  // Reset the search term after selection
    };

    const formatPhoneNumber = (number) => {
        let sanitizedNumber = number.replace(/\D/g, '');
        if (!sanitizedNumber.startsWith('255')) {
            // Remove leading zero if present
            if (sanitizedNumber.startsWith('0')) {
                sanitizedNumber = sanitizedNumber.substring(1);
            }
            sanitizedNumber = `255${sanitizedNumber}`;
        }

        return `+${sanitizedNumber}`;
    };

    const handlePaymentNumberChange = (event) => {
        const inputNumber = event.target.value;
        const formattedNumber = formatPhoneNumber(inputNumber);

        setFormData({ ...formData, paymentNumber: formattedNumber });
        setErrors(prev => ({ ...prev, paymentNumber: "" }));
    };
    
    return (
        <div>
            <h1>Payment Info</h1>
            <div className="form-group">
              <div className="form-group my-4">
              <FormGroup>
                        <InputGroup className="mb-3">
                            <DropdownButton
                                variant="outline-secondary"
                                title={formData.channel || "Select your mobile network"}
                                id="input-group-dropdown-1"
                                onSelect={handleSelectNetwork}
                                style={{ maxWidth: "100%" }}
                            >
                                {mobileNetworks.map((network) => (
                                    <Dropdown.Item key={network.value} eventKey={network.value}>
                                        {network.name}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </InputGroup>
                    </FormGroup>
                </div>
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
                {errors.paymentNumber && <p className="error" >{errors.paymentNumber}</p>}
                </div>
            </div>
        </div>
    );
}   
export default OrderForm4