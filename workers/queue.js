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

module.exports = {waitableQueue, serverAdapter}