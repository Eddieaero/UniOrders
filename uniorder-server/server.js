require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');
const express = require("express");
const cors = require("cors");
const app = express();
const { initiatePayment } = require('./zenoApi');
const { body, validationResult } = require('express-validator');
const winston = require('winston');
const qs = require('qs');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const corsOptions = {
    origin: ['http://localhost:5173'],  // Replace with your frontend domain
    optionsSuccessStatus: 200
  };
app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }



app.post(
    "/initiate-payment",
    [
      body('buyer_name').isLength({ min: 2 }).trim().withMessage('Invalid buyer name'),
      body('buyer_phone').isMobilePhone('any').trim().withMessage('Invalid phone number'),
      body('buyer_email').isEmail().trim().withMessage('Invalid email'),
      body('amount').isNumeric().withMessage('Amount should be numeric'),
      body('transactionRef').isAlphanumeric().trim().withMessage('Invalid transaction reference')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
  
      const { buyer_name, buyer_phone, buyer_email, amount, transactionRef } = req.body;

      const data = {
        create_order: 1,
        buyer_name,
        buyer_phone,
        buyer_email,
        amount,
        account_id: process.env.ZENO_ACCOUNT_ID,
        secret_key: process.env.ZENO_SECRET_KEY,
        api_key: process.env.ZENO_API_KEY
      };
      
      const formattedData = qs.stringify(data);

      try {
        // Send request to Zeno Pay API
        const response = await axios.post('https://api.zeno.africa', formattedData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        logger.info('Zeno payment initiated', { transactionRef, response: response.data });
        res.json(response.data);
    } catch (error) {
        logger.error('Zeno payment initiation failed', { transactionRef, error: error.response ? error.response.data : error.message });
        res.status(500).send('Payment initiation failed');
    }
    }
  );
  


  app.post(
    "/payment-callback",
    [
      body('transactionRef').isAlphanumeric().withMessage('Invalid transaction reference'),
      body('statusCode').isIn(['PAYMENT_ACCEPTED', 'PAYMENT_FAILED']).withMessage('Invalid status code')
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { transactionRef, statusCode } = req.body;
  
      if (statusCode === "PAYMENT_ACCEPTED") {
        const sql = 'UPDATE orders SET OrderStatus = ? WHERE orderId = ?';
        const values = ["Paid", transactionRef]; // Assuming transactionRef corresponds to orderId
  
        connection.query(sql, values, (err, result) => {
          if (err) {
            logger.error('Error updating order status', { transactionRef, error: err });
            res.status(500).send('Error updating order status');
            return;
          }
          logger.info('Order status updated to Paid', { transactionRef });
          res.status(200).send('Order status updated to Paid');
        });
      } else if (statusCode === "PAYMENT_FAILED") {
        logger.warn(`Payment failed for transactionRef: ${transactionRef}`);
        res.status(200).send('Payment failed');
      } else {
        res.status(400).send('Unknown status code');
      }
    }
  );



app.get("/orders-list", (req, res) => {    
    const sql = 'SELECT * FROM orders';
    connection.query(sql, (err, data) => {
        if (err) {
            logger.error('Error fetching orders', { error: err });
            res.status(500).send('Error fetching orders');
            return;
        }
        res.json(data);
    });
});

app.post(
    "/orders",
    [
      body('orderId').isString().withMessage('Invalid order ID'),
      body('firstName').isAlpha().trim().withMessage('Invalid first name'),
      body('lastName').isAlpha().trim().withMessage('Invalid last name'),
      body('availablePhone').isMobilePhone('any').trim().withMessage('Invalid phone number'),
      body('universityName').isLength({ min: 2 }).trim().withMessage('Invalid university name'),
      body('universityCourse').isLength({ min: 2 }).trim().withMessage('Invalid course name'),
      body('sashColor').isLength({ min: 3 }).trim().withMessage('Invalid sash color'),
      body('paymentNumber').isMobilePhone('any').trim().withMessage('Invalid payment number'),
      body('OrderDate').isISO8601().toDate().withMessage('Invalid order date'),
      body('OrderStatus').isIn(['Paid', 'Unpaid']).withMessage('Invalid order status')
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, OrderDate, OrderStatus } = req.body;
      const formattedOrderDate = new Date(OrderDate).toISOString().split('T')[0];
      const sql = 'INSERT INTO orders (orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, OrderDate, OrderStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, formattedOrderDate, OrderStatus];
  
      connection.query(sql, values, (err, result) => {
        if (err) {
          logger.error('Error creating order', { error: err });
          res.status(500).send('Error creating order');
          return;
        }
        logger.info('Order created successfully', { orderId });
        res.status(201).send('Order created successfully');
      });
    }
  );

  app.put(
    "/orders/:orderId/status",
    [
      body('OrderStatus').isIn(['Paid', 'Unpaid']).withMessage('Invalid order status')
    ],
    (req, res) => {
      const { orderId } = req.params;
      const newStatus = req.body.OrderStatus;
  
      const sql = 'UPDATE orders SET OrderStatus = ? WHERE orderId = ?';
      const values = [newStatus, orderId];
  
      connection.query(sql, values, (err, result) => {
        if (err) {
          logger.error('Error updating order status', { orderId, error: err });
          res.status(500).send('Error updating order status');
          return;
        }
        if (result.affectedRows === 0) {
          logger.warn('Order not found', { orderId });
          res.status(404).send('Order not found');
          return;
        }
        logger.info('Order status updated successfully', { orderId });
        res.status(200).send('Order status updated successfully');
      });
    }
  );


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

  module.exports = logger;
