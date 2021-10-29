const express = require('express')

const User = require("../models/Users");

const { body, validationResult } = require('express-validator')

const router = express.Router()

//Create a User using: POST "/api/auth/createuser". NO login required

router.post('/createuser', [
    // body('name').isLength({min:3}),         //here i used express validator for sanitize user input
    // body('email').isEmail(),                 //without any error message 
    // body('password').isLength({min:5})

    body('name', "Enter a valid Name<this is error message>").isLength({ min: 3 }),         //here i used express validator for sanitize user input
    body('email', "Enter a valid Email<this is error message>").isEmail(),                   //with proper error message
    body('password', "Enter a valid Password<this is error message>").isLength({ min: 5 })

], async (req, res) => {     //router.get() work same as app.get() where "app=express()"
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Errors: errors.array() });
    }

    try {
        //check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user Exist with this Email" })
        }

        //it insert the data in mongodb database 
        let myuser = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email

        })
        res.json(myuser)  //it send myuser's value as a json to the client in the response
    }
    catch (err) 
    {
        console.error(err)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Sone Error Occur")
    }

    // // console.log(req.body)

    // const users=User(req.body);
    // users.save()
    // console.log("save Data")   //this code used first time when does not used express validator package for validation

    // res.send(req.body)
})

module.exports = router;


