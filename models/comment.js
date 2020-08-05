const mongoose = require("mongoose");
const schema = mongoose.Schema; 



const commentSchema = new schema({

  content: {
    type: String,
    required: true, 
    trim: true 
  },



  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true
  },


  article: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "articles", 
    required: true
  },




  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }


});


module.exports = mongoose.model("comments", commentSchema);