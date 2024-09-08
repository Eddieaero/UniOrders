const mysql = require('mysql2');
const express = require("express");
const cors = require("cors");
const app = express();
const { initiatePayment } = require('./temboApi');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Edson@000',
    database: 'uniorders'
  });

app.use(cors());
app.use(express.json());


app.post("/initiate-payment", async (req, res) => {
    const { msisdn, channel, amount, narration, transactionRef, transactionDate, callbackUrl } = req.body;

    try {
        const paymentResponse = await initiatePayment( msisdn, channel, amount, narration, transactionRef, transactionDate, callbackUrl);
        res.json(paymentResponse);
    } catch (error) {
        console.error('Payment initiation failed:', error);
        res.status(500).send('Payment initiation failed');
    }
});

app.get("/orders-list", (req, res) => {    
    const sql = 'SELECT * FROM orders';
    connection.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
            return;
        }
        res.json(data);
    })

});

app.post("/orders", (req, res) => {
    const { orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, OrderDate, OrderStatus  } = req.body;
    const formattedOrderDate = new Date(OrderDate).toISOString().split('T')[0];
    const sql = 'INSERT INTO orders (orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, OrderDate, OrderStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [ orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, formattedOrderDate, OrderStatus];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
            return;
        }
        res.status(201).send('Order created successfully');
    });
});

app.put("/orders/:orderId/status", (req, res) => {
    const { orderId } = req.params;
    const newStatus = req.body.OrderStatus;

    const sql = 'UPDATE orders SET OrderStatus = ? WHERE orderId = ?';
    const values = [newStatus, orderId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating order status');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Order not found');
            return;
        }
        res.status(200).send('Order status updated successfully');
    });
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database.');
  });


