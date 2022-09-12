const {waitableQueue} = require('./queue')
const {sendMail} = require("../emailMiddleware");
const {jobModel} = require('../model/job')
const obj ={}

const dispatchFunctionAndWait = async (mailTo, subject, body) => {
    const job = await waitableQueue.add({
        params: {
            mailTo,
            subject,
            body,
        },
    })
    return new Promise(async (resolve, reject) => {
        obj[job.id] = [resolve, reject]
    })
}

waitableQueue.process(async (jobData) => {
    const jobParams = jobData.data.params
    const hello = await sendMail(jobParams.mailTo, jobParams.subject, jobParams.body)
    return hello
})

waitableQueue.on('global:completed', async (jobId) => {
    if(obj.hasOwnProperty(jobId)) {
        const jobData = await waitableQueue.getJob(jobId)
        obj[jobId][0](jobData.returnvalue)
    }
})

waitableQueue.on('global:failed', (jobId) => {
    if(obj.hasOwnProperty(jobId)) {
        obj[jobId][1](`rejected ${jobId}`)
    }
})

module.exports = {dispatchFunctionAndWait}