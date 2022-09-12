const Bull = require('bull')
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const waitableQueue = new Bull('waitable-queue', {
    redis: {
        host: "127.0.0.1",
        port: 6379,
    },
})

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(waitableQueue)],
    serverAdapter: serverAdapter,
});

// waitableQueue.process((job) => {
//     console.log(typeof job.data.functionName)
//     // throw new Error('something wend wrong')
//     return job.data
// })
//
// waitableQueue.on('global:completed', (jobId) => {
//     // console.log('yha', jobId)
//     // obj.JobId == jobId
//     if(jobId == obj.Jobid) {
//         // obj.jobId[0]()
//     }
//     resolve()
//
// })
//
// waitableQueue.on('global:failed', (jobId) => {
//     console.log('etho?', jobId)
// })

module.exports = {waitableQueue, serverAdapter}