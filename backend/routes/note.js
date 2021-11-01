const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')



//ROUTE1: Get All Notes using: GET "/api/auth/login", Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {  //fetchuser is a user defined middleware
    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (err) {
        console.error(err)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE2: Add a new Notes using: POST "/api/auth/login", Login required
router.post('/addnote', fetchuser, [

    body('title', "Enter a valid Title<this is error message>").isLength({ min: 3 }),         //here i used express validator for sanitize user input
    body('description', "Description Must be 5 character<this is error message>").isLength({ min: 5 }),      //with proper error message
], async (req, res) => {  //fetchuser is a user defined middleware
    try {
        const { title, description, tag } = req.body;
        //if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)
    }
    catch (err) {
        console.error(err)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;