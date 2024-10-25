require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const winston = require('winston');

// Logging setup using Winston
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

// Function to create the headers required for the Zeno Pay API
const createHeaders = () => ({
  'Content-Type': 'application/x-www-form-urlencoded',
});

// Function to initiate a payment through Zeno Pay
const initiatePayment = async (buyer_name, buyer_phone, buyer_email, amount, transactionRef) => {
  const url = 'https://api.zeno.africa';
  
  // Request payload to send to the Zeno Pay API
  const data = {
    create_order: 1,
    buyer_name,
    buyer_phone,
    buyer_email,
    amount,
    account_id: process.env.ZENO_ACCOUNT_ID,
    secret_key: process.env.ZENO_SECRET_KEY,
    api_key: process.env.ZENO_API_KEY,
  };

  // Convert data to x-www-form-urlencoded format using qs library
  const formattedData = qs.stringify(data);

  let retries = 5; // Retry limit
  let attempt = 0;
  let response;



while (attempt < retries) {
  try {
      response = await axios.post(url, formattedData, {
          headers: createHeaders(),
          timeout: 10000  // Timeout of 10 seconds for the API call
      });
      logger.info('Payment initiated successfully', { transactionRef, response: response.data });
      return response.data;
  } catch (error) {
      attempt++;
      logger.error(`Error initiating payment (Attempt ${attempt})`, { transactionRef, error: error.message });
      if (attempt >= retries) {
          throw new Error('Max retries reached. Payment initiation failed.');
      }
  }
}
};

const checkPaymentStatus = async (order_id) => {
  const url = 'https://api.zeno.africa/order-status';
  const data = { check_status: 1, order_id };
  const formattedData = qs.stringify(data);



  let status = null;
  const startTime = Date.now();
  const timeout = 60000;  // 1 minute timeout
  const pollInterval = 5000; // Poll every 5 seconds

  // Polling loop to check payment status
  while (Date.now() - startTime < timeout) {
    try {
      const response = await axios.post(url, formattedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const paymentStatus = response.data?.payment_status;
      logger.info('Payment status response', { order_id, response: response.data });

      if (paymentStatus === 'COMPLETED') {
        logger.info('Payment completed successfully', { order_id });
        status = 'success';
        break;
      } else if (paymentStatus === 'PENDING') {
        logger.warn('Payment failed', { order_id });
        status = 'failed';
        break;
      }

      // Wait for 5 seconds before next status check
      

    } catch (error) {
      logger.error('Error checking payment status', { order_id, error: error.message });
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  if (!status) {
    logger.warn('Payment status check timed out', { order_id });
    status = 'timeout';
  }

  return status;
};

module.exports = {
  initiatePayment,
  checkPaymentStatus,
};
