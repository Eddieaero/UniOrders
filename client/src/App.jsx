import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Modules/Home/Home";
import Order from "./Modules/Order/Order";
import OrderList from "./Modules/Order/OrderList";
import OrderPayment from "./Modules/Order/OrderPayment";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Order" element={<Order/>} />
        <Route path="/Order-List" element={<OrderList/>} />
        <Route path="/payment" element={<OrderPayment/>} />
      </Routes>
    </Router>
 )
};
export default App;
