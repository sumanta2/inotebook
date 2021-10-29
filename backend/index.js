const connectToMongo=require("./db")
const express = require('express')

// const User=require("../models/Users");

connectToMongo();

// const data=User({"name":"sumanta"})


const app = express()
const port = 5000

app.use(express.json())  //this code help to receive json data in backend send by font-end  api

app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.use() used for using any middleware