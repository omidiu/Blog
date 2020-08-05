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
* Display Blogger profile page 
**********************************************************************************/
router.get("/myProfile", validation.authenticateToken, UserController.bloggerProfilePage);



/*********************************************************************************
* Display Blogger Info page 
**********************************************************************************/
router.get("/:username", validation.authenticateToken, UserController.bloggerDetailsPage);





/*********************************************************************************
* Edit profile page (PUT)
**********************************************************************************/
router.put("/:username/editprofile", validation.authenticateToken, validation.editProfileForm, UserController.editBloggerInfo);


/*********************************************************************************
* change password (PUT)
**********************************************************************************/
router.put("/:username/editprofile/changePassword", validation.authenticateToken, validation.oldPasswordCorrect, validation.changePassForm, UserController.changePassword);



module.exports = router;
