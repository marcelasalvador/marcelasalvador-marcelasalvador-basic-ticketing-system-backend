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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  }, 
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
