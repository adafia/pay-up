const _ = require('lodash')


module.exports.sortCascade = (data, summaries) => {
     // Sort for cascade
    // Sort data and return record that do not have season ids and have season debts
    const sortedCascade = data.map(record => {
        if (!record.SeasonID) {
            return {
                [record.Amount]: summaries.filter(summary => {
                    return (summary.CustomerID == record.CustomerID && parseFloat(summary.TotalRepaid) < parseFloat(summary.Credit))
                }),
            }
        }
    })

    // Remove undefined sorted entries and return
    return _.compact(sortedCascade)

}


module.exports.sortOveride = (data, summaries) => {
    const sortedOverRide = data.map(record => {
        if (record.SeasonID) {
            return {
                CustomerID: record.CustomerID,
                SeasonID: record.SeasonID,
                Amount: record.Amount,
                CustomerSummaryToUpdate: summaries.filter(summary => {
                    return (summary.CustomerID == record.CustomerID && summary.SeasonID == record.SeasonID)
                })
            }
        }
    })

    // Remove undefined sorted entries and return
    return _.compact(sortedOverRide)
}

module.exports.sortOverPaid = (data, summaries) => {
    const sortedOverPaid = data.map(record => {
        return summaries.filter(summary => {
            return (summary.CustomerID == record.CustomerID && parseFloat(summary.Credit) < parseFloat(summary.TotalRepaid))
        })
    })

    return _.compact(sortedOverPaid)
}


// sortedCascade.map(record => {
//     let amt = parseFloat(Object.keys(record)[0])
    
//     return record[amt].map((summary, index, elements) => {
//         let owed = parseFloat(summary.Credit) - parseFloat(summary.TotalRepaid)
        
//         const cascade = (num) => {
//             if(num <= 0){
//                 console.log('No money left')
//                 return
//             } else if(num <= owed) {
//                 console.log(`i can pay for only season: ${summary.SeasonID}. I have: ${num} and I owe: ${owed}`)
                
//             } else if(num > owed){
//                 console.log(`i can pay for season ${summary.SeasonID} and ${elements[index+1].SeasonID}`)
//             }

//             // console.log(num)
//             console.log('----------------------------------------------------------------------------------')
//             num = num - owed
//             cascade(num)
//         }

//         cascade(amt)
        

//     })
    
// }) 
