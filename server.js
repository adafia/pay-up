const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const _ = require('lodash')
const bodyParser = require('body-parser');
const { computePayment } = require('./lib/service')


const app = express();
app.use(fileUpload({ createParentPath: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', computePayment)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
