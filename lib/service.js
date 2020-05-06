const mongoose = require('mongoose')
const _ = require('lodash')
const uuid = require('uuid');
const { wb, toJson } = require('../helpers/xlsx')

const Customer = mongoose.model('customer')
const CustomerSummary = mongoose.model('customersummary')

module.exports = Service = {
    async computePayment(req, res) {
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

                // Get all customer summaries from the database
                const summaries = await CustomerSummary.find().sort('-StartDate')

                // Sort for cascade
                // Sort data and return record that do not have season ids and have season debts
                let sorted = data.map(record => {
                    if (!record.SeasonID) {
                        return {
                            CustomerID: record.CustomerID,
                            Amount: record.Amount,
                            CustomerSummaries: summaries.filter(summary => {
                                return (summary.CustomerID == record.CustomerID && parseFloat(summary.TotalRepaid) < parseFloat(summary.Credit))
                            }),
                        }
                    }
                })

                // Sort for Overpaid
                // Sort data and return record that do not have season ids and have NO season debts
                let sortedOverPaid = data.map(record => {
                    if (!record.SeasonID) {
                        return {
                            CustomerID: record.CustomerID,
                            Amount: record.Amount,
                            CustomerSummaries: summaries.filter(summary => {
                                return (summary.CustomerID == record.CustomerID && parseFloat(summary.TotalRepaid) > parseFloat(summary.Credit))
                            }),
                        }
                    }
                })

                // Remove undefined sorted entries
                sorted = _.compact(sorted)
                sortedOverPaid = _.compact(sortedOverPaid)

                console.log('Amount', sorted[1].Amount)
                // console.log(sorted)

                console.log('Credit = ',parseFloat(sorted[1].CustomerSummaries[1].Credit))
                console.log('TotalRepaid = ',parseFloat(sorted[1].CustomerSummaries[1].TotalRepaid))
                // console.log('Credit = ',parseFloat(sortedOverPaid[0].CustomerSummaries[0].Credit))
                // console.log('TotalRepaid = ',parseFloat(sortedOverPaid[0].CustomerSummaries[0].TotalRepaid))
                

                // cascade logic
                const computed = sorted.map(rec => {
                    rec.AmtLeft = rec.Amount
                    return {
                        RepaymentID: uuid.v4(),
                        CustomerID: rec.CustomerID,
                        PaymentRecords: rec.CustomerSummaries.map(summary => {
                            // Check if they still have funds
                            if (rec.AmtLeft > 0) {
                                if((parseFloat(summary.Credit) - parseFloat(summary.TotalRepaid)) >= rec.Amount) {
                                    rec.AmtLeft = 0
                                    summary.TotalRepaid = parseFloat(summary.TotalRepaid) + rec.Amount
                                    return summary
    
                                } else {
                                    rec.AmtLeft = rec.Amount - (parseFloat(summary.Credit) - parseFloat(summary.TotalRepaid))
                                    summary.TotalRepaid = parseFloat(summary.TotalRepaid) + (parseFloat(summary.Credit) - parseFloat(summary.TotalRepaid))
                                    return summary
                                } 
                            }
                        })
                    }

                })
                

                console.log('========computed===========')
                console.log('Credit =', parseFloat(computed[1].PaymentRecords[1].Credit))
                console.log('TotalRepaid =', parseFloat(computed[1].PaymentRecords[1].TotalRepaid))

                console.log('========Fin===========')


               

                // console.log('computed ==>', parseFloat(computed[0].PaymentRecords[0].TotalRepaid))
                
                
                
                return res.send('File uploaded')
            }
        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Server Error')
        }
    }
}
