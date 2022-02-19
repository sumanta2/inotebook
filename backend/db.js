
//ISSUE:: Environment variable in nodejs are not work properly need to check this issue

const mongoose = require('mongoose');


const dotenv=require('dotenv');
dotenv.config({path:'./backend/mystore.env'})   


const mongoURI = process.env.MONGO_URI


const ATLAS_URI = process.env.ATLAS_URI;    //url for mongodb atlas database



const connectToMongo = () => {
    try {
        mongoose.connect(ATLAS_URI, () => {
            console.log("Mongoose connect Successfully")
        })
    }
    catch (err) {
        console.log("error occur at beginning", err)
    }
}

module.exports = connectToMongo;