const xlsx = require("xlsx");
const _ = require("lodash")
const uuid = require('uuid')

module.exports.wb = (filePath) => {
   return xlsx.readFile(filePath, { cellDates: true }) 
}

module.exports.toJson = (workSheet) => {
   return xlsx.utils.sheet_to_json(workSheet) 
}

module.exports.toXlsx = (jsonData) => {
   const newWorkBook = xlsx.utils.book_new()
   const newWorkSheet = xlsx.utils.json_to_sheet(jsonData)

   xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Repayments')

   const id = uuid.v4()
   xlsx.writeFile(newWorkBook, `Repayments_${id}.xlsx`)
}


module.exports.getSpecifiedSheet = (workBook, name) => {
    const workSheet = workBook.SheetNames.map(sheetName => {
        if (sheetName === name) {
            return xlsx.utils.sheet_to_json(workBook.Sheets[sheetName])
        }
    })

    return _.compact(workSheet)
}
