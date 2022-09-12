const mongoose = require('mongoose')

const URL = 'mongodb+srv://rahul:rahul@cluster0.bdmadka.mongodb.net/?retryWrites=true&w=majority'

const databaseConnection = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('mongo connection successfull')
    } catch(err) {
        console.log('err with mongo connection')
    }
}

module.exports = {databaseConnection}