const axios = require('axios');
const pool = require('./database');
const path = require('path');
const express = require("express");
const multer = require('multer');
const cors = require("cors");
const { initiatePayment, checkPaymentStatus } = require('./zenoApi');
const { body, validationResult } = require('express-validator');
const winston = require('winston');
const qs = require('qs');
const fs = require('fs');


const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'],  // Replace with your frontend domain
    optionsSuccessStatus: 200
  };

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
  
      try {
        // Initiate payment without checking status
        const paymentResponse = await initiatePayment(buyer_name, buyer_phone, buyer_email, amount, transactionRef);
        const order_id = paymentResponse.order_id;  // Assuming Zeno API sends back `order_id`
  
        // Send back the `order_id` to the frontend
        logger.info('Zeno Payment initiated', { transactionRef, paymentResponse: paymentResponse.data });
        res.status(200).json({ status: 'initiated', order_id, transactionRef });
      } catch (error) {
        logger.error('Zeno payment initiation failed', { transactionRef, error: error.message });
        res.status(500).send('Payment initiation failed');
      }
    }
  );


  app.post(
    "/confirm-payment",
    [
      body('order_id').isString().trim().withMessage('Invalid order ID'),
      body('transactionRef').isAlphanumeric().withMessage('Invalid transaction reference'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
  
      const { transactionRef, order_id } = req.body;
  
      try {
        // Check payment status with Zeno API
        const paymentStatus = await checkPaymentStatus(order_id);
  
          if (paymentStatus === 'success') {
            const sql = 'UPDATE orders SET OrderStatus = ? WHERE orderId = ?';
            const values = ["Paid", transactionRef];

            // Update the order status
            await pool.query(sql, values);
            logger.info('Order status updated to Paid', { transactionRef });
            res.status(200).json({ status: 'success', message: 'Payment confirmed' });
        } else {
            res.status(400).json({ status: paymentStatus, message: 'Payment failed' });
        }
    } catch (error) {
        logger.error('Error checking payment status', { order_id, error: error.message });
        res.status(500).json({ error: 'Error checking payment status' });
    }
  }
);


  
app.get("/orders-list", async (req, res) => {
  const sql = 'SELECT * FROM orders';
  try {
      const [rows] = await pool.query(sql);
      res.json(rows);
  } catch (err) {
      console.log(err)
      logger.error('Error fetching orders', { error: err });
      res.status(500).send('Error fetching orders');
  }
});




app.post('/create-order', upload.single('universityImage'), async (req, res) => {
  const { orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, OrderDate, OrderStatus, quote } = req.body;
  const file = req.file;
  const formattedOrderDate = new Date(OrderDate).toISOString().split('T')[0];
  const sql = 'INSERT INTO orders (orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, OrderDate, OrderStatus, quote, logo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [orderId, firstName, lastName, availablePhone, universityName, universityCourse, sashColor, paymentNumber, formattedOrderDate, OrderStatus, quote || null, null];

  try {
      await pool.query(sql, values);

      if (file) {
          const fileURL = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

          const updateLogoSQL = 'UPDATE orders SET logo_url = ? WHERE orderId = ?';
          await pool.query(updateLogoSQL, [fileURL, orderId]);

          res.status(201).json({ message: 'Order and logo created successfully', orderId: orderId, fileURL: fileURL });
      } else {
          res.status(201).json({ message: 'Order created successfully', orderId: orderId });
      }
  } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ error: 'Duplicate orderId' });
      } else {
          console.error('Error creating order:', err);
          res.status(500).send('Error creating order');
      }
    }
  });

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
  
      pool.query(sql, values, (err, result) => {
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


  module.exports = logger;
