const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");
const validation = require("../tools/validation");


/*********************************************************************************
* add new Blogger
**********************************************************************************/
router.post('/signup', validation.registerForm, UserController.signUpBlogger);


/*********************************************************************************
* login Blogger
**********************************************************************************/
router.post('/login', UserController.loginBlogger);



/*********************************************************************************
* Display Blogger page 
**********************************************************************************/
router.get("/:username", validation.authenticateToken, UserController.bloggerDetailsPage);


module.exports = router;
