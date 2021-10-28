const express=require('express')

const User=require("../models/Users");

const { body, validationResult}=require('express-validator')

const router=express.Router()

//Create a User using: POST "/api/auth"

router.post('/',[
    // body('name').isLength({min:3}),         //here i used express validator for sanitize user input
    // body('email').isEmail(),                 //without any error message 
    // body('password').isLength({min:5})

    body('name',"Enter a valid Name<this is error message>").isLength({min:3}),         //here i used express validator for sanitize user input
    body('email',"Enter a valid Email<this is error message>").isEmail(),                   //with proper error message
    body('password',"Enter a valid Password<this is error message>").isLength({min:5})

],(req,res)=>{     //router.get() work same as app.get() where "app=express()"

    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({Errors:errors.array()});
    }
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email

    }).then((User)=>{res.json(User)})
    .catch((err)=>{console.log(err)
        res.status(400).json({error:"Please enter a unique value",errMessage:err.message})  //err.message display which error occur
    })
    // // console.log(req.body)

    // const users=User(req.body);
    // users.save()
    // console.log("save Data")   //this code used first time when does not used express validator package for validation

    // res.send(req.body)
})

module.exports=router;


