const mongoose = require('mongoose');
const config = require('config');
const data = require('../files/IT Dev Final Interview - Seasonless Repayment.json')

const db = config.get('mongoURI');

module.exports.connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports.populateDB = async () => {
    const Customer = mongoose.model('customer')
    const CustomerSummary = mongoose.model('customersummary')
    const Season = mongoose.model('season')
    const RepaymentUpload = mongoose.model('repaymentupload')
    
    const customers = await Customer.find()
    const summaries = await CustomerSummary.find()
    const seasons = await Season.find()
    const repaymentUploads = await RepaymentUpload.find()
 

    if(customers.length === 0) {
        Customer.insertMany(data.Customers)
    }
    
    if(summaries.length === 0) {
        CustomerSummary.insertMany(data.CustomerSummaries)
    }

    if(seasons.length === 0) {
        Season.insertMany(data.Seasons)
    }

    if(repaymentUploads.length === 0) {
        RepaymentUpload.insertMany(data.RepaymentUploads)
    }
}