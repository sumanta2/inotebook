const mongoose=require("mongoose")
  const { Schema } = mongoose;

  const userSchema = new Schema({

    name:{
        type:String,     // datatype String first letter S must be capital letter
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    date:{
        type:String,
        default:Date.now     //here not used '()' after the Date.now function
    },
    
  });

  const User= mongoose.model("user",userSchema);

  module.exports=  User;

  //here i create the schema of user collection in mongodb Database and export it