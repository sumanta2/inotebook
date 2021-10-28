const express=require('express')

const User=require("../models/Users");

const router=express.Router()

//Create a User using: POST "/api/auth"

router.post('/',(req,res)=>{     //router.get() work same as app.get() where "app=express()"
    console.log(req.body)
    const Data={
        "name":"Sumanta"
    }

    const users=User(req.body);
    users.save()
    console.log("save Data")

    res.send(req.body)
})

module.exports=router;