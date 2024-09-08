require('dotenv').config();
const axios = require('axios');



const createHeaders = () => ({
  'Content-Type': 'application/json',
  'x-account-id': process.env.TEMBO_ACCOUNT_ID,
  'x-secret-key': process.env.TEMBO_SECRET_KEY,
  'x-request-id': process.env.TEMBO_REQUEST_ID,
});

const initiatePayment = async (msisdn, amount, transactionRef, callbackUrl) => {
  try {
    const response = await axios.post('https://sandbox.temboplus.com/tembo/v1/collection', {
      msisdn,
      channel,
      amount,
      narration,
      transactionRef,
      transactionDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      callbackUrl
    }, {
      headers:createHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  initiatePayment,
};
