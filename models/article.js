const mongoose = require("mongoose");
const schema = mongoose.Schema; 



const articleSchema = new schema({


  title: {
    type: String,
    required: true, 
    minlength: 3, 
    maxlength: 30, 
    trim: true
  }, 

  description: {
    type: String,
    required: true,
    minlength: 10
  },

  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true
  },

  avatarSrc: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }

});


module.exports = mongoose.model("articles", articleSchema);