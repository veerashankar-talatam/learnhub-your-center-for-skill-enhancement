const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    C_educator: {
      type: String,
      required: true
    },

    C_categories: {
      type: String,
      required: true
    },

    C_title: {
      type: String,
      required: true
    },

    C_description: {
      type: String,
      required: true
    },

    sections: {
      type: Number,
      required: true
    },

    C_price: {
      type: Number,
      default: 0
    },

    enrolled: {
      type: Number,
      default: 0
    },

    // ✅ CORRECT MODULE STRUCTURE
    modules: [
      {
        title: {
          type: String,
          required: true
        },
        videoUrl: {
          type: String,
          required: true
        }
      }
    ],

    enrolledStudents: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        progress: {
          type: Number,
          default: 0
        },
        purchased: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);