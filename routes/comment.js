const express = require("express");
const router = express.Router();

// user model
const User = require("../models/user");





router.get("/", (req, res) => {
  res.render("signup")
});



router.post("/", async (req, res) => {
  
  // validation for better user experience here: 
  // here/

  // if everything is ok code below should run: 
  let user = new User ({
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    username: req.body.username, 
    password: req.body.password, 
    sex: req.body.sex, 
    mobile: req.body.mobile, 
    role: "blogger" 
  })

  user.save((err) => {
    if (err) return console.log(err);
    console.log("created successfully");
    res.send("ok");
  })

  

});







module.exports = router;