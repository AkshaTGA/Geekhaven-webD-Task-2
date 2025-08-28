const { time } = require("console");
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: new Date(),
  },
  method: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  ip: {
    type: String,
  },
  headers: {
    type: Object,
  },

});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
