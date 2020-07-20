const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");
const validation = require("../tools/validation");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



/*********************************************************************************
* add new Blogger
**********************************************************************************/
router.post('/signup', validation.registerForm, UserController.signUpBlogger);


module.exports = router;
