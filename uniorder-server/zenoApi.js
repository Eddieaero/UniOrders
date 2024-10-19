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
  'x-secret-key': process.env.ZENO_SECRET_KEY,
  'x-api-key': process.env.ZENO_API_KEY,
  'x-account-id': process.env.ZENO_ACCOUNT_ID,
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

  try {
    // Make API request to Zeno Pay
    const response = await axios.post(url, formattedData, {
      headers: createHeaders(),
    //   timeout: 10000, // Timeout set to 10 seconds
    });
    
    // Log the successful payment response
    logger.info('Payment initiated successfully', { transactionRef, response: response.data });

    // Return the API response data
    return response.data;
  } catch (error) {
    // Log errors
    if (error.response) {
      logger.error('API error during payment initiation', { transactionRef, error: error.response.data });
    } else {
      logger.error('Error initiating payment', { transactionRef, error: error.message });
    }

    // Re-throw the error so that calling code can handle it
    throw error;
  }
};

module.exports = {
  initiatePayment,
};
