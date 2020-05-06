const mongoose = require('mongoose');

const RepaymentUploadSchema = new mongoose.Schema({
    CustomerID: { type: Number },
    SeasonID: { type: Number },
    Date: { type: Date },
    Amount: { type: mongoose.Decimal128 }
});

mongoose.model('repaymentupload', RepaymentUploadSchema)
