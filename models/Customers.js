const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  CustomerID: { type: Number, required: true, unique: true },
  CustomerName: { type: String, required: true, unique: true }
});

mongoose.model('customer', CustomerSchema);
