const mongoose = require("mongoose")
const { Schema } = mongoose;


const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // it helps to store UserId of another(Here models/User model) models used like foreign key in MYSQL
        ref:'user'   //  it get the reference of the model which's  model's collection Id will stores here
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: String,
        default: Date.now     //here not used '()' after the Date.now function
    },

});

module.exports = mongoose.model("notes", notesSchema);

  //here i create the schema of note collection in mongodb Database and export it