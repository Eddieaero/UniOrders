import {useState, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import {Col, Row} from "react-bootstrap"

const OrderList = () => {
const [activeButton, setActiveButton] = useState("All");
const [orders, setOrders] = useState([]);
const [filteredOrders, setFilteredOrders] = useState([]);
const pollingInterval = 5000; // Poll every 5 seconds
const allOrdersCount = orders.length;
const paidOrdersCount = orders.filter((order) => order.orderStatus === "Paid").length;
const unpaidOrdersCount = orders.filter((order) => order.orderStatus === "Unpaid").length;

  useEffect(() => {
    fetchOrders("All");
    const interval = setInterval(fetchOrders, pollingInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilter(); 
  }, [activeButton, orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/orders-list`);
      // const response = await fetch(`http://localhost:5000/orders-list?filter=${filter}`);
      // const response = await fetch(`http://localhost:5173/src/Modules/Order/orders.json?filter=${filter}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const applyFilter = () => {
    let filtered = orders;

    if (activeButton === "Paid") {
      filtered = orders.filter((order) => order.orderStatus === "Paid");
    } else if (activeButton === "Unpaid") {
      filtered = orders.filter((order) => order.orderStatus === "Unpaid");
    }
    setFilteredOrders(filtered); // Update the filtered orders based on the active filter
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // fetchOrders(buttonName);
  };

  return (
    <div>
      <NavBar/>
        <div className="p-lg-2 flex">
          <p className="p-lg-1" style={{textAlign: "left", fontWeight: "normal ", fontSize: "18px", marginLeft: "60px"}}>Orders</p>
          <div className="m-lg-3 p-lg-3" style={{borderRadius: "32px", backgroundColor: "#F6F9FF", width: "auto", height: "600px"}}>
            <div>
              <div className="d-flex" >
                <div  className="col-lg-10 m-lg-0" style={{display:"flex", textAlign: "left", justifyContent: '', gap: '30px' }}>
                  <button className={`order-button ${activeButton === "All" ? "active" : ""}`} onClick={() => handleButtonClick("All")}>All({allOrdersCount}) </button>
                  <button className={`order-button ${activeButton === "Paid" ? "active" : ""}`} onClick={() => handleButtonClick("Paid")}>Paid({paidOrdersCount})</button>
                  <button className={`order-button ${activeButton === "Unpaid" ? "active" : ""}`} onClick={() => handleButtonClick("Unpaid")}>Unpaid({unpaidOrdersCount})</button>
                </div>
                <div className="col-lg-2 p-lg-1 d-flex justify-content-end">
                  <button className="p-lg-1" style={{textAlign: "center",color:"white",borderRadius:"5px", backgroundColor: "#AE8625",width:"150px", border: "none",justifyContent: 'flex-end'}}>Download (.xlsx)</button>
                </div>
              </div>
              <div>
                <div> 
                  <Row className="p-lg-2 " style={{textAlign: "center",  borderTop:"1px solid " }}>
                    <Col className="col-lg-1">Order ID</Col>
                    <Col className="col-lg-2">Name</Col>
                    <Col className="col-lg-2">University</Col>
                    <Col className="col-lg-2">Course</Col>
                    <Col className="col-lg-1" style={{textAlign: "right"}}>Color</Col>
                    <Col className="col-lg-2">Payment number</Col>
                    <Col className="col-lg-1" style={{textAlign: "left"}}>Action</Col>
                    <Col className="col-lg-1" style={{textAlign: "left"}}>Status</Col>
                  </Row>
                </div>
                {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                // {orders.length > 0 ? (
                // orders.map((order, index) => (
                  <div key={index} className="p-1 m-1 order-item" style={{ backgroundColor: "white", borderRadius: "15px", display: "inline-block", margin: "0px 0", gap: "15px"  }}>
                    <Row className="m-lg-1 p-lg-1 " style={{ textAlign: "left", gap: "10px" }}>
                      <Col className="col-lg-1">{order.orderId}</Col>
                      <Col className="col-lg-2">{`${order.firstName} ${order.lastName}`}</Col>
                      <Col className="col-lg-2">{order.universityName}</Col>
                      <Col className="col-lg-2">{order.universityCourse}</Col>
                      <Col className="col-lg-1">{order.sashColor}</Col>
                      <Col className="col-lg-1">{order.paymentNumber}</Col>
                      <Col className="col-lg-1" style={{textAlign: "right"}}>{order.Action}</Col>
                      <Col className="col-lg-1" style={{textAlign: "right"}}>{order.orderStatus}</Col>
                    </Row>
                  </div>
                ))
                ) : (
                  <div className="p-lg-2" style={{ backgroundColor: "white", borderRadius: "15px", display: "inline-block" }}>
                    <p className="m-lg-1">No Orders Currently</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
)
} 

export default OrderList;