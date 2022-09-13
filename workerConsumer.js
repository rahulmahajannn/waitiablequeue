const {waitableQueue} = require('./workers/queue')
const {sendMail} = require("./emailMiddleware");

waitableQueue.process(async (jobData) => {
    const jobParams = jobData.data.params
    const successMsg = await sendMail(jobParams.mailTo, jobParams.subject, jobParams.body)
    return successMsg
})



