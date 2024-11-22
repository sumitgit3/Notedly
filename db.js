const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (error) {
        console.log(error);
        console.log('Failed to connect to database');
        process.exit(1);
    }
}

module.exports = {connectToDB};