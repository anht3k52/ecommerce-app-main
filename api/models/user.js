const mongoose = require("mongoose");
let count = 0; // Khởi tạo biến đếm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  
  verificationToken: String,
  addresses: [
    {
    
       name: String,
      sdt: String,
      houseNo: String,
      street: String,
      khuvuc: String,
      city: String,
      country: String,
      postalCode: String,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User",userSchema);

module.exports = User
