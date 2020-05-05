const { exposeData } = require('../helpers/xlsx')

module.exports = Service = {
    async computePayment(req, res) {
        try {
            if (!req.files) {
                return res.send('No file uploaded')
            } else {
                const { file } = req.files
                const filePath = `./temp/${file.name}`
                await file.mv(filePath)
                
                const data = await exposeData(filePath)
                
                return res.send('File uploaded')
            }
        } catch (err) {
            console.error(err.message)
            return res.status(500).send('Server Error')
        }
    }
}
