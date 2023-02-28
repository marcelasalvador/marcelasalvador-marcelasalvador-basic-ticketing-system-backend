const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    name:{
        type: String,
        required: true,
    },
  
    email: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
      },
    
    createdAt: {
         type: Date,
         default: Date.now
      },

    status: {
        type: String,
        enum: ['new', 'in progress', 'resolved'],
        default: 'new'
      },
  
    messages: [
        {
        text: {
            type: String,
            required: true
        },
        author: {
            type: String,
            enum: ['user', 'admin'],
            required: true
          },
        createdAt: {
            type: Date,
            default: Date.now
        }
        }
    ],
},

  {
    timestamps: true
  }
);

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
