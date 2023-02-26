const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
      email:{
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        require: true
    },
    
      name: {
        type: String,
        required: true
      },

      isAdmin: { 
        type: Boolean, 
        default: false 
      },
    }, 

    
    
    {
      timestamps: true
    }
  );

const User = model("User", userSchema);

module.exports = User;
