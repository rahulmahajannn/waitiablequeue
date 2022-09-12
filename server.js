const express = require('express')
const {sendMail} = require('./emailMiddleware')
const bodyParser = require("body-parser");
const {dispatchFunctionAndWait} = require('./workers/dispatchFunctionAndWait')
const {serverAdapter} = require('./workers/queue')
const cors = require("cors");
const {databaseConnection} = require('./databaseConnection')
const {jobModel} = require('./model/job')
const app = express()
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// databaseConnection()
const PORT = 8080

app.get('/', (req, res) => {
    return res.json({
        message: 'welcome to our page'
    })
})

app.post('/sendemail', async (req, res) => {
    const {mailTo, subject, body} = req.body;
    const response = await dispatchFunctionAndWait(mailTo, subject, body)
    // console.log('yah se?', response)
    console.log(response)
    const modified = response.toUpperCase()
    return res.send({modified})
})

app.get('/getData', async (req, res) => {
    const data = await jobModel.find().populate('resolve')
    console.log(data[0].resolve)
    return res.send(data[0].resolve)
})

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(PORT, () => {
    console.log(`application running on port ${PORT}`)
})