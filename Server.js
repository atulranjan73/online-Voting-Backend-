const mongoose = require("mongoose")
const dotenv = require("dotenv")
const express = require("express")
const connectionDB = require("./config/db")
dotenv.config()
const voteRoutes = require("./Router/VoteRouters");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(cors())



connectionDB().then(()=>{
    const PORT = process.env.PORT ||8000
    app.listen(PORT , ()=>{
        console.log(`server is starting Port no ${PORT}` )
    })
   
}).catch((error)=>{
    console.log("mongodb is not connected " , error);
})


app.use('/api', voteRoutes);