const mongoose = require('mongoose');


const Message = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Message", Message);