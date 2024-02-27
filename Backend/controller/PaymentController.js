// Importing required modules
const Payment = require("../models/Payment");
const stripe = require("stripe")("sk_test_51OlpYMSCNujN812W8yzHmmUscDxtcgd3artFiXeLs6zdpxoLE4J85LCRJsRM5St08DBvaRUpnK6mso9Kjv659J4O00jY50Dn6G");



// Controller to create a payment
const CreatePayment = async (req, res) => {
  try {
    const { token,description, currency, amount } = req.body;

    // Generate a token for the test card
    const source = await createToken();

    // Create a charge using the token
    const charge = await stripe.charges.create({
      amount,
      currency,
      source:token,
      description,
    });

    // Save payment details to MongoDB
    const newPayment = new Payment({
      description,
      source,
      currency,
      amount,
    });

    await newPayment.save();

    return res.status(200).json({ message: 'Payment successful', charge });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

// Exporting the controller
module.exports = { CreatePayment };
