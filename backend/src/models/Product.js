const { default: mongoose, Schema } = require("mongoose");

const paymentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: Object
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true }) 
// { timestamps: true } : 데이터가 생성될때 createAt, updatedAt 정보가 자동 저장됨

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;