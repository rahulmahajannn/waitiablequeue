const express = require('express')
const bodyParser = require("body-parser");
const {dispatchFunctionAndWait} = require('./workers/dispatchFunctionAndWait')
const {serverAdapter} = require('./workers/queue')
const cors = require("cors");
const app = express()
const {obj} = require('./obj')
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
    const modified = response.toUpperCase()
    return res.send({modified})
})

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(PORT, () => {
    console.log(`application running on port ${PORT}`)
})