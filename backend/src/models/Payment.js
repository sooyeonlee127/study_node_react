
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const paymentSchema = mongoose.Schema({

})


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
