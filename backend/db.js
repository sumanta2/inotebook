const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";    //url for local mongodb database
const atlasURI="mongodb+srv://sumanta21:mydata21@cluster0.rdzl4.mongodb.net/inotebook?retryWrites=true&w=majority"; //url for mongodb atlas database

const connectToMongo=()=>{
    mongoose.connect(atlasURI,()=>{
        console.log("Mongoose connect Successfully")
    })
}

module.exports=connectToMongo;