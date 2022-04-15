const mongoose = require('mongoose');

const dbconnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)
        console.log('db online')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inciar la database')
    }
}

module.exports = dbconnection;