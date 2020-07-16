const mongoose = require("mongoose");
const schema = mongoose.Schema; 



const UserSchema = new schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 30,
    minlength: 3,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 8
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['blogger', 'admin']
  },
  imageProfileSrc: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
  
});


module.exports = mongoose.model("users", UserSchema);