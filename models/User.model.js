// import mongoose from "mongoose";
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: {
    type: String,
    required: true,
    enum: ["newMember", "FullMember"],
    default: "newMember"
  },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }]
});

module.exports = mongoose.model('User', User);