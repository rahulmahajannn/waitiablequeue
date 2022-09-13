const {waitableQueue} = require('./queue')
const {obj} = require('../obj')
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

waitableQueue.on('global:completed', async (jobId) => {
    if(obj.hasOwnProperty(jobId)) {
        const jobData = await waitableQueue.getJob(jobId)
        obj[jobId][0](`${jobId} ${jobData.returnvalue}`)
    }
})

waitableQueue.on('global:failed', async (jobId) => {
    if(obj.hasOwnProperty(jobId)) {
        const jobData = await waitableQueue.getJob(jobId)
        obj[jobId][0](`${jobId} ${jobData.returnvalue}`)
    }
})

module.exports = {dispatchFunctionAndWait}