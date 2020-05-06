const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDB, populateDB } = require('./config/db');
require('./models/Seasons');
require('./models/Customers');
require('./models/CustomerSummaries');
require('./models/RepaymentUploads');
require('./models/Repayments');


const app = express();

connectDB()
populateDB()

app.use(fileUpload({ createParentPath: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', require('./routes/files'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
