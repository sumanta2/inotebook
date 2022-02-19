const connectToMongo=require("./db")
const express = require('express')
var cors = require('cors')


const dotenv=require('dotenv');
dotenv.config({path:'./backend/mystore.env'})

connectToMongo();

// const data=User({"name":"sumanta"})


const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())  //this code help to receive json data in backend send by font-end  api

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))


app.listen(port, () => {
  console.log(`INotebook backend app listening at http://localhost:${port}`)
})

// app.use() used for using any middleware