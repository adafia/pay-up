const mongoose = require('mongoose');

const CustomerSummarySchema = new mongoose.Schema({
    CustomerID: { type: Number },
    SeasonID: { type: Number },
    TotalRepaid: { type: mongoose.Decimal128 },
    Credit: { type: mongoose.Decimal128 }
});

mongoose.model('customersummary', CustomerSummarySchema)
