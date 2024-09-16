require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');
const express = require("express");
const cors = require("cors");
const app = express();
const { initiatePayment } = require('./temboApi');
const { body, validationResult } = require('express-validator');
const winston = require('winston');


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
      body('msisdn').isMobilePhone('any').trim().withMessage('Invalid phone number'),
      body('channel').isIn(['TZ-AIRTEL-C2B', 'TZ-TIGO-C2B', 'TZ-HALOTEL-C2B']).withMessage('Invalid channel'),
      body('amount').isNumeric().withMessage('Amount should be numeric'),
      body('narration').trim().isLength({ min: 3 }).withMessage('Narration should be at least 3 characters long'),
      body('transactionRef').isAlphanumeric().trim().withMessage('Invalid transaction reference'),
      body('transactionDate').isISO8601().toDate().withMessage('Invalid date format'),
      body('callbackUrl').isURL().withMessage('Invalid callback URL')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { msisdn, channel, amount, narration, transactionRef, transactionDate, callbackUrl } = req.body;
  
      try {
        const paymentResponse = await initiatePayment(msisdn, channel, amount, narration, transactionRef, transactionDate, callbackUrl);
        logger.info('Payment initiated', { transactionRef, paymentResponse });
        res.json(paymentResponse);
      } catch (error) {
        logger.error('Payment initiation failed', { error });
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
