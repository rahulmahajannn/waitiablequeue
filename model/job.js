const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    jobId: {
        type:Number,
    },
    resolve: {
        type: String
    }
})

const jobModel = mongoose.model('Job', jobSchema)

module.exports = {jobModel}