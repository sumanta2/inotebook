const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')

  

//ROUTE1: Get All Notes using: GET "/api/notes/login", Login required
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



//ROUTE2: Add a new Notes using: POST "/api/notes/login", Login required
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



//ROUTE3:Update an existing Notes using: PUT "/api/notes/updatenote:id", Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {


    const { title, description, tag } = req.body;
    try {
        //Creating a new note for update this to an existing note
        let newNote = {};
        if (title) { newNote.title = title }    //if inside the title variable any value present then it return true
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //Find the note to be updated
        const note = await Notes.findById(req.params.id)  //req.params.id get the id value from url
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() != req.user.id) {   //note.user.toString() return the ID of
            return res.status(401).send("Not Allowed")
        }

        const result = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) //new:true means if new content are inputted by user then this new content will inserter as a new entry  findByIdAndUpdate() method get an id an a collection and ind which collection's id is match by the given id this collection will updated
        res.json({ result: result })

    }
    catch (err) {
        console.error(err)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }
})



//ROUTE4:Delete an existing Notes using: DELETE "/api/notes/deletenote:id", Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    // const { title, description, tag } = req.body;
    try {
        //Find the note to be deleted
        let note = await Notes.findById(req.params.id)  //req.params.id get the id value from url
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletion if user allow this notes
        if (note.user.toString() != req.user.id) {   //note.user.toString() return the ID of
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json(({ "success": "Note has been deleted", note: note }))
    }
    catch (err) {
        console.error(err)  //it work same as console.log() when we pass exception object in side console.error() 
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;