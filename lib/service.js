const mongoose = require('mongoose')
const _ = require('lodash')
const uuid = require('uuid');
const { wb, toJson } = require('../helpers/xlsx')
const { sortCascade, sortOveride } = require('../helpers/utils')

const CustomerSummary = mongoose.model('customersummary')
const RepaymentUpload = mongoose.model('repaymentupload')
const Repayment = mongoose.model('repayment')

module.exports = Service = {
    async upload(req, res) {
        try {
            if (!req.files) {
                return res.status(400).send('No file uploaded')
            } else {
                // Access uploaded file from the request object
                const { file } = req.files
                const filePath = `./temp/${file.name}`
                await file.mv(filePath)
                
                // Access uploaded file and convert it to json
                const workBook = await wb(filePath)
                const workSheet = workBook.Sheets['Repayment Upload']
                const data = toJson(workSheet);

                data.map(item => {
                    const record = new RepaymentUpload(item)
                    record.save()
                })
                
                return res.send(data)
            }
        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Server Error')
        }
    },

    async compute(req, res) {
        try {
            const data = req.body;

            // Get all customer summaries from the database
            const summaries = await CustomerSummary.find().sort('-StartDate')

            // sort data accordingly
            const sortedCascade = sortCascade(data, summaries)
            const sortedOverRide = sortOveride(data, summaries)

            const repaymentRecords = [];
            const customerSummaries = [];

            // Over ride logic
            sortedOverRide.map(rec => {
                return rec.CustomerSummaryToUpdate = rec.CustomerSummaryToUpdate.map(summary => {
                    const id = uuid.v4()
                    const repaymentRecord = {
                        RepaymentID: id,
                        CustomerID: rec.CustomerID,
                        SeasonID: rec.SeasonID,
                        Date: Date.now(),
                        Amount: rec.Amount,
                        ParentID: id
                    }
                    repaymentRecords.push(repaymentRecord)
                    const updatedCustomerSummary = {
                        id: summary._id,
                        CustomerID: rec.CustomerID,
                        SeasonID: rec.SeasonID,
                        Credit: parseFloat(summary.Credit),
                        TotalRepaid: parseFloat(rec.Amount) + parseFloat(summary.TotalRepaid),
                        init: parseFloat(summary.TotalRepaid),
                    }
                    customerSummaries.push(updatedCustomerSummary)
                })
            })


            // Cascade logic
            const CascadeNeeded = []
            const CascadeSummaries = []

            sortedCascade.map(record => {
                let amount = parseFloat(Object.keys(record)[0])
                record[amount].map((summary, index, elements) => {
                    let owed = parseFloat(summary.Credit) - parseFloat(summary.TotalRepaid)
                    if (index === 0) {
                        if (owed >= amount){
                            const id = uuid.v4()
                            const repaymentRecord = {
                                RepaymentID: id,
                                CustomerID: summary.CustomerID,
                                SeasonID: summary.SeasonID,
                                Date: Date.now(),
                                Amount: amount,
                                ParentID: id
                            }
                            repaymentRecords.push(repaymentRecord)
                            const updatedCustomerSummary = {
                                id: summary._id,
                                CustomerID: summary.CustomerID,
                                SeasonID: summary.SeasonID,
                                Credit: parseFloat(summary.Credit),
                                TotalRepaid: amount + parseFloat(summary.TotalRepaid),
                                init: parseFloat(summary.TotalRepaid),
                            }
                            customerSummaries.push(updatedCustomerSummary)
                        } else if (owed < amount && elements.length === 1){
                            const id = uuid.v4()
                            const repaymentRecord = {
                                RepaymentID: id,
                                CustomerID: summary.CustomerID,
                                SeasonID: summary.SeasonID,
                                Date: Date.now(),
                                Amount: amount,
                                ParentID: id
                            }
                            repaymentRecords.push(repaymentRecord)
                            const updatedCustomerSummary = {
                                id: summary._id,
                                CustomerID: summary.CustomerID,
                                SeasonID: summary.SeasonID,
                                Credit: parseFloat(summary.Credit),
                                TotalRepaid: amount + parseFloat(summary.TotalRepaid),
                                init: parseFloat(summary.TotalRepaid),
                            }
                            customerSummaries.push(updatedCustomerSummary)
                        } else if (owed < amount && elements.length > 1) {
                            const id = uuid.v4()
                            const repaymentRecord = {
                                RepaymentID: id,
                                CustomerID: summary.CustomerID,
                                SeasonID: summary.SeasonID,
                                Date: Date.now(),
                                Amount: amount,
                                ParentID: id,
                                next: elements[index+1].id,
                                amtOverPaid: amount - owed,
                                _credit: parseFloat(summary.Credit),
                                _id_: summary._id
                            }
                            CascadeNeeded.push(repaymentRecord)
                            repaymentRecords.push(repaymentRecord)
                            
                            const updatedCustomerSummary = {
                                id: summary._id,
                                CustomerID: summary.CustomerID,
                                SeasonID: summary.SeasonID,
                                Credit: parseFloat(summary.Credit),
                                TotalRepaid: amount + parseFloat(summary.TotalRepaid),
                                init: parseFloat(summary.TotalRepaid),
                            }
                            customerSummaries.push(updatedCustomerSummary)
                            CascadeSummaries.push(updatedCustomerSummary)
                        }
                    } else if (CascadeNeeded.length > 0) {
                        
                        return CascadeNeeded.map((item, index, elements) => {
                            if(item.next == summary._id){

                                if (owed > item.amtOverPaid) {
                                    const id = uuid.v4()
                                    const repaymentRecord_ = {
                                        RepaymentID: id,
                                        CustomerID: item.CustomerID,
                                        SeasonID: item.SeasonID,
                                        Date: Date.now(),
                                        Amount: -item.amtOverPaid,
                                        ParentID: item.RepaymentID 
                                    }
                                    repaymentRecords.push(repaymentRecord_)

                                    const repaymentRecord = {
                                        RepaymentID: id,
                                        CustomerID: summary.CustomerID,
                                        SeasonID: summary.SeasonID,
                                        Date: Date.now(),
                                        Amount: item.amtOverPaid,
                                        ParentID: item.RepaymentID 
                                    }
                                    repaymentRecords.push(repaymentRecord)
                                    CascadeNeeded.slice(index, 1)

                                } else {
                                    const id = uuid.v4()
                                    const repaymentRecord = {
                                        RepaymentID: id,
                                        CustomerID: summary.CustomerID,
                                        SeasonID: summary.SeasonID,
                                        Date: Date.now(),
                                        Amount: item.amtOverPaid,
                                        ParentID: item.RepaymentID,
                                        next: elements[index+1].id,
                                        amtOverPaid: (parseFloat(summary.TotalRepaid) + item.amtOverPaid) - parseFloat(summary.Credit),
                                        _credit: parseFloat(summary.Credit),
                                        _id_: summary._id
                                    }
                                    repaymentRecords.push(repaymentRecord)
                                    CascadeNeeded.push(repaymentRecord)
                                    const updatedCustomerSummary = {
                                        id: summary._id,
                                        CustomerID: summary.CustomerID,
                                        SeasonID: summary.SeasonID,
                                        Credit: parseFloat(summary.Credit),
                                        TotalRepaid: amount + parseFloat(summary.TotalRepaid),
                                        init: parseFloat(summary.TotalRepaid),
                                    }
                                    customerSummaries.push(updatedCustomerSummary)
                                }
                                
                            } 
                        })
                    }
                    
                })
            })

            return res.send({customerSummaries, repaymentRecords})

            
        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Server Error')
        }
        
    },

    async save(req, res) {
        const { customerSummaries, repaymentRecords } = req.body;

        try {
            repaymentRecords.map(item => {
                const record = new Repayment(item)
                record.save()
            })

            customerSummaries.map(async summary => {
                const found = await CustomerSummary.findById(summary.id)
                if(found) {
                    await CustomerSummary.updateOne(summary)
                } else {
                    const newSummary = await new CustomerSummary(summary)
                    newSummary.save()
                }
            })

            return res.send('Changes have been saved')

        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Server Error')
        }
        
    }
}
