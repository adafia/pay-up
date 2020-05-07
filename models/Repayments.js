const mongoose = require('mongoose');

const RepaymentSchema = new mongoose.Schema({
    RepaymentID: { type: String },
    CustomerID: { type: Number },
    SeasonID: { type: Number },
    Date: { type: Date },
    Amount: { type: mongoose.Decimal128 },
    ParentID: { type: String }
});

mongoose.model('repayment', RepaymentSchema)
