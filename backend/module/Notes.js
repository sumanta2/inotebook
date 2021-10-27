import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const notesSchema = new Schema({

    title:{
        type:string,
        required:true,
    },
    description:{
        type:string,
        required:true,
    },
    tag:{
        type:string,
        default:"General"
    },
    date:{
        type:string,
        default:Date.now     //here not used '()' after the Date.now function
    },
    
  });

  module.export=mongoose.model("notes",NotesSchema);

  //here i create the schema of note collection in mongodb Database and export it