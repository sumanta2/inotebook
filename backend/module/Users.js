import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const userSchema = new Schema({

    name:{
        type:string,
        required:true,
    },
    email:{
        type:string,
        required:true,
    },
    password:{
        type:string,
        required:true,
        unique:true,
    },
    date:{
        type:string,
        default:Date.now     //here not used '()' after the Date.now function
    },
    
  });

  module.export=mongoose.model("user",UserSchema);

  //here i create the schema of user collection in mongodb Database and export it