const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require("../models/Users");
const router = express.Router()
const fetchuser=require('../middleware/fetchuser')


//ROUTE1: Create a User using: POST "/api/auth/createuser". NO login required
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

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);    //the genSalt() and hash() method work like php md5 and sha1() method 

        //it insert the data in mongodb database 
        let myUser = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email

        })

        //token generation cade is here
        const JWT_SECRET = 'Harryisagood$boy'
        const data = {
            user: {              //here using jsonwebtoken package and its method we create a token(like php cookies) and send to the client
                id: myUser.id
            }
        }
        const jwtData = jwt.sign(data, JWT_SECRET)  //sign() method get data,secretKey string(2nd parameter and generate token)
        res.json(jwtData)
    }


    catch (err) {
        console.error(err)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }

    // // console.log(req.body)

    // const users=User(req.body);
    // users.save()
    // console.log("save Data")   //this code used first time when does not used express validator package for validation

    // res.send(req.body)
})






//ROUTE2: Authenticate a User using: POST "/api/auth/login", NO login required
router.post('/login', [

    body('email', "Enter a valid Email<this is error message>").isEmail(),                   //with proper error message
    body('password', "Enter a valid Password<this is error message>").exists()

    //If there are errors, return Bad request and the errors
], async (req, res) => {
    let success=false

    //If there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body; //here object destructuring concept is used

    try {

        let user = await User.findOne({ email: email })  //findOne method fetch data form mongodb database according to email inputted by user
        if (!user) {
            res.status(400).json({ error: "Please try to login using correct Data" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            res.status(400).json({ error: "Please try to login using correct Data" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SECRET = 'Harryisagood$boy'
        const authToken = jwt.sign(data, JWT_SECRET)   //here generate the token(like session in PHP)
        res.json({status:true, authToken:authToken })
    }
    catch (error) {
        console.error(error)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }
})

//Route3: Get logged-in User Details using : POST   "/api/auth/getuser". Login required


router.post('/getuser',fetchuser, async (req, res) => {   //here fetchuser is a middleware(one type user-defined function )
    try {

        const userId = req.user.id
        const user=await User.findById(userId).select("-password")  //  '-password' means it select all field without password field form mongodb

        res.send(user)

    } catch (error) {
        console.error(error)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;


