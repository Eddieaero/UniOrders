import {useState, useEffect } from "react";
import axiosInstance from "../../Controllers/axiosInstance";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import {Col, Row} from "react-bootstrap";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const OrderList = () => {
const [activeButton, setActiveButton] = useState("All");
const [orders, setOrders] = useState([]);
const [filteredOrders, setFilteredOrders] = useState([]);
const pollingInterval = 5000; // Poll every 5 seconds
const allOrdersCount = orders.length;
const paidOrdersCount = orders.filter((order) => order.OrderStatus === "Paid").length;
const unpaidOrdersCount = orders.filter((order) => order.OrderStatus === "Unpaid").length;


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
      const response = await axiosInstance.get('/orders-list');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const applyFilter = () => {
    let filtered = orders;
    if (activeButton === "Paid") {
      filtered = orders.filter((order) => order.OrderStatus === "Paid");
    } else if (activeButton === "Unpaid") {
      filtered = orders.filter((order) => order.OrderStatus === "Unpaid");
    }
    setFilteredOrders(filtered); 
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleDownload = () => {
    const paidOrders = orders.filter((order) => order.OrderStatus === "Paid");
    const worksheet = XLSX.utils.json_to_sheet(paidOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Paid Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Paid orders.xlsx");
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
                  <button className="p-lg-1" style={{textAlign: "center",color:"white",borderRadius:"5px", backgroundColor: "#AE8625",width:"150px", border: "none",justifyContent: 'flex-end'}} onClick={handleDownload}>Download (.xlsx)</button>
                </div>
              </div>
              <div  style={{ maxHeight: "500px", overflowY: "auto" }}>
                <div> 
                  <Row className="p-lg-2 p-sm-3 " style={{textAlign: "center",  borderTop:"1px solid " }}>
                    <Col className="col-lg-1 col-sm-1 d-none d-md-flex">Order ID</Col>
                    <Col className="col-lg-2 col-sm-1">Name</Col>
                    <Col className="col-lg-2 col-sm-1">University</Col>
                    <Col className="col-lg-2 col-sm-1 d-none d-md-flex">Course</Col>
                    <Col className="col-lg-1 col-sm-1" style={{textAlign: "right"}}>Color</Col>
                    <Col className="col-lg-2 col-sm-1 d-none d-md-flex">Payment number</Col>
                    <Col className="col-lg-1 col-sm-1 d-none d-md-flex" style={{textAlign: "left"}}>Available Phone</Col>
                    <Col className="col-lg-1 col-sm-1" style={{textAlign: "left"}}>Status</Col>
                  </Row>
                </div>
                {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <div key={index} className="p-1 m-1 order-item" style={{ backgroundColor: "white", borderRadius: "15px", display: "inline-block", margin: "0px 0", gap: "15px"  }}>
                    <Row className="m-lg-1 p-lg-1 " style={{ textAlign: "left", gap: "10px" }}>
                      <Col className="col-lg-1 d-none d-md-flex">{order.orderId}</Col>
                      <Col className="col-lg-2">{`${order.firstName} ${order.lastName}`}</Col>
                      <Col className="col-lg-2">{order.universityName}</Col>
                      <Col className="col-lg-2 d-none d-md-flex">{order.universityCourse}</Col>
                      <Col className="col-lg-1">{order.sashColor}</Col>
                      <Col className="col-lg-1 d-none d-md-flex">{order.paymentNumber}</Col>
                      <Col className="col-lg-1 d-none d-md-flex" style={{textAlign: "right"}}>{order.availablePhone}</Col>
                      <Col className="col-lg-1" style={{textAlign: "right"}}>{order.OrderStatus}</Col>
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