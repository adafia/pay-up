const xlsx = require("xlsx");

module.exports.exposeData = (filePath) => {
    const wb = xlsx.readFile(filePath, { cellDates: true })

    const wsList = wb.SheetNames;

    const data = wsList.map(ws => {
        return { [ws]: xlsx.utils.sheet_to_json(wb.Sheets[ws]) }
    })

    return data
}
