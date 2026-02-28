const mongoose = require("mongoose");

const coursePaymentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    cardDetails: {
      cardholdername: {
        type: String,
        required: true,
      },
      cardnumber: {
        type: String,
        required: true,
      },
      expmonthyear: {
        type: String,
        required: true,
      },
    },

    paymentStatus: {
      type: String,
      default: "SUCCESS",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoursePayment", coursePaymentSchema);