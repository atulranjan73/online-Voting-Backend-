const mongoose= require("mongoose")

require('dotenv').config();

const connectionDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is connected")
    } catch (error) {
        console.error("Mongo connection is failed " ,error);
    }
}
module.exports = connectionDB