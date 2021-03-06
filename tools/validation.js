const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {uploadArticleImage} = require('./uploadArticleAvatarImage');
const {uploadBloggerAvatarImage} = require('./uploadBloggerAvatarImage');

/*********************************************************************************
**********************************************************************************
**********************************************************************************
****************************** Users and Index ***********************************
**********************************************************************************
**********************************************************************************
**********************************************************************************/



/*********************************************************************************
* Validate register form
**********************************************************************************/
exports.registerForm = (req, res, next) => {
  // get information from request body.
  let {firstName, lastName, username, password, password_confirmation, sex, mobile} = req.body;

  let userDataForRegister = {
    firstName: firstName,
    lastName: lastName,
    username: username, 
    password: password, 
    password_confirmation: password_confirmation, 
    sex: sex,
    mobile: mobile
  }

  // Atleast 1 letter, 1 number, 1 special character 
  // min 8 characters, max 20 characters 
  let passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/; 


  // Mobile pattern
  let numberPattern = /^[0-9]*$/;

  // Define signup form schema with specific error for each case. 
  let schema = Joi.object().keys({
      firstName:  Joi
                  .string()
                  .min(3)
                  .max(30)
                  .lowercase()
                  .required()
                  .messages({
                    "string.base": "Firstname is not valid",
                    'any.required': "Firstname is require",
                    'string.min': "Your firstname should contain at least 3 character", 
                    'string.max': "Your firstname should contain at last 30 character"
                    
                  }), 
  
  
      lastName:   Joi
                  .string()
                  .min(3)
                  .max(30)
                  .lowercase()
                  .required()
                  .messages({
                    "string.base": "Lastname is not valid",
                    'any.required': "Lastname is require",
                    'string.min': "Your lastname should contain at least 3 character", 
                    'string.max': "Your lastname should contain at last 30 character"
                  }),
  
                  
      username: Joi
                .string()
                .min(3)
                .max(30)
                .lowercase()
                .required()
                .messages({
                  "string.base": "username is not valid",
                  'any.required': "username is require",
                  'string.min': "Your username should contain at least 3 character", 
                  'string.max': "Your username should contain at last 30 character"                
                }),
                
                
      password: Joi
                .string()
                .min(8)
                .max(30)
                .pattern(passwordPattern)
                .required()
                .messages({
                  "string.min": "Your password should contain at least 3 character",
                  "string.max": "Your password should contain at last 30 character",
                  "string.pattern.base": "Your password should contain special character, at least a letter, at least a number"
                }),
  
      password_confirmation:  Joi
                              .any()
                              .valid(Joi.ref('password'))
                              .required()
                              .messages({
                                'any.only': "Please confirm Your password correctly"
                              }),
  
      sex:  Joi
            .string()
            .valid('male', 'female')
            .required()
            .messages({
              "any.only": 'Sex must be "male" or "female"'
            }),
  
            
  
  
  
      mobile: Joi
              .string()
              .min(8)
              .regex(numberPattern)
              .required()
              .messages({
                'string.min': "Your phone number should contain at least 8 digits", 
                "string.pattern.base": "Your phone number is not valid"
              })
              
  });

  // check data is valid or not
  let {error} = schema.validate(userDataForRegister);



  
  // if any error render "pages/signup" with proper error message
  if (error) 
    return res.status(400).render('pages/signup', {
      message: error.details[0].message, 
      messageClass: "alert-danger", 
      userInfo: userDataForRegister
    });

  // no error 
  next();
    
  
}


/*********************************************************************************
* Validate edit profile form
**********************************************************************************/
exports.editProfileForm = (req, res, next) => {

  // get information from request body. (for edit profile)
  let {firstName, lastName, sex, mobile} = req.body;


  // create new user info object
  let newUserInfo = {
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    mobile: mobile
  }


  // Mobile pattern
  let numberPattern = /^[0-9]*$/;

  // Define signup form schema with specific error for each case. 
  let schema = Joi.object().keys({
      firstName:  Joi
                  .string()
                  .min(3)
                  .max(30)
                  .lowercase()
                  .required()
                  .messages({
                    "string.base": "Firstname is not valid",
                    'any.required': "Firstname is require",
                    'string.min': "Your firstname should contain at least 3 character", 
                    'string.max': "Your firstname should contain at last 30 character"
                    
                  }), 
  
  
      lastName:   Joi
                  .string()
                  .min(3)
                  .max(30)
                  .lowercase()
                  .required()
                  .messages({
                    "string.base": "Lastname is not valid",
                    'any.required': "Lastname is require",
                    'string.min': "Your lastname should contain at least 3 character", 
                    'string.max': "Your lastname should contain at last 30 character"
                  }),
  
                  
     
  
      sex:  Joi
            .string()
            .valid('male', 'female')
            .required()
            .messages({
              "any.only": 'Sex must be "male" or "female"', 
              'any.required': "Sex is require"
            }),
  
          
      mobile: Joi
              .string()
              .min(8)
              .regex(numberPattern)
              .required()
              .messages({
                'string.min': "Your phone number should contain at least 8 digits", 
                "string.pattern.base": "Your phone number is not valid"
              })
              
  });

  // check data is valid or not
  let {error} = schema.validate(newUserInfo);

  // if any error render "pages/signup" with proper error message
  if (error) return res.status(400).json({
    message: error.details[0].message, 
  });

  // no error 
  next();
    
  
}



/*********************************************************************************
* Validate password is correct (PUT)
**********************************************************************************/
exports.oldPasswordCorrect = async (req, res, next) => {

  // get old pass
  let {oldPass} = req.body;

  // check password is not empty
  if (!oldPass) return res.status(400).json({
    message: "Your old password shouldn't be empty", 
  });

  // get username
  let username = req.user.username;



  // get user
  let user = await User.findOne({username: username});

  // check oldpass is correct or not
  let passwordCorrect = await bcrypt.compare(oldPass, user.password);

  // not correct -> re-render "pages/users/edit" with proper error message.
  if (!passwordCorrect) return res.status(400).json({
    message: "Your old password is not correct", 
  });

  
  // old pass is correct 
  next();
  

};  

/*********************************************************************************
* Validate change password form (PUT)
**********************************************************************************/
exports.changePassForm = (req, res, next) => {

  // get info from req.body
  let {newPass, newPassConfirmation} = req.body

  // define {newpass, newPass_confirmation }
  let newPassWithConfirmation = {
    newPass, 
    newPassConfirmation
  }

  // Atleast 1 letter, 1 number, 1 special character 
  // min 8 characters, max 20 characters 
  let passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/; 


  // Define newPassword form schema with specific error for each case. 
  let schema = Joi.object().keys({
                
      newPass: 
                Joi
                .string()
                .min(8)
                .max(30)
                .pattern(passwordPattern)
                .required()
                .messages({
                  'any.required': "new password shouldn't be empty",
                  "string.min": "Your password should contain at least 8 character",
                  "string.max": "Your password should contain at last 30 character",
                  "string.pattern.base": "Your password should contain special character, at least a letter, at least a number"
                }),
  
      newPassConfirmation:  
                Joi
                .any()
                .valid(Joi.ref('newPass'))
                .required()
                .messages({
                  'any.required': "new password confirmation shouldn't be empty",
                  'any.only': "Please confirm Your password correctly"
                }),
              
  });

  // check data is valid or not
  let {error} = schema.validate(newPassWithConfirmation);

  // if any error render "pages/signup" with proper error message
  if (error) return res.status(400).json({
    message: error.details[0].message,
  });

  // no error 
  next();
}



/*********************************************************************************
* For all route except "users/login" and "users/signup"
**********************************************************************************/
exports.authenticateToken = (req, res, next) => {
  
  // get token on cookie
  const token = req.cookies["token"];


  // if no token sets
  if (token == null) return res.redirect('/login') // no token means user should login or register first
  

  // check token is valid or not
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect('/login');  // user should login

    // set req.user for next middleware
    req.user = user;

    // give controll to next middleware
    next();
  });
    
  
  
};




/*********************************************************************************
* For just "users/login" and "users/signup" route.
**********************************************************************************/
exports.redirectToMainPageWithValidtoken = (req, res, next) => {

  // Gather the jwt access token from the request header
  const token = req.cookies["token"];
  if (token == null) return next(); // no token means user should login or register


  // verify token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return next(); // no valid token means user should login or register
    
    // should redirect user to main page
    res.redirect('/'); // change later. Should pass articles in JSON.
  });
    
  
  
};


exports.addBloggerAvatarImage = (req, res, next) => {

  // Define upload  (single avatar for article)
  let upload = uploadBloggerAvatarImage.single('avatar');

  upload(req, res, (err) => {

    if (err){ 
      res.status(400).json({
        message: err, 
        messageClass: 'alert-danger', 
      });

    } else {
      if (typeof req.file === 'undefined') {
        return res.status(400).json({
          message: "Error: No File selected",
          messageClass: "alert-danger",
        })
      } else {
        res.locals.filename = req.file.filename;
        next();
      }
      
    }
    
    
  });
  
  // next called inside the upload (last else)

};





  
/*********************************************************************************
**********************************************************************************
**********************************************************************************
******************************     Articles    ***********************************
**********************************************************************************
**********************************************************************************
**********************************************************************************/

exports.addArticleFormImage = (req, res, next) => {

  // Define upload  (single avatar for article)
  let upload = uploadArticleImage.single('avatar');

  upload(req, res, (err) => {
    
    // Get information (for rendering again with previous "title" and "description")
    let {title, description} = req.body

    if (err){ 
      res.render('pages/articles/newArticle', {
        message: err, 
        messageClass: 'alert-danger', 
        title, 
        description
      })
    } else {
      if (typeof req.file === 'undefined') {
        return res.render('pages/articles/newArticle', {
          message: "Error: No File selected",
          messageClass: "alert-danger",
          title, 
          description
        })
      } else {
        res.locals.filename = req.file.filename;
        next()
      }
      
    }
    
    
  });
  
  // next called inside the upload (last else)

};






exports.addArticleFormText = (req, res, next) => {

  // Get information from request body.
  let {title, description} = req.body;


  // Define article info
  let newArticleText = {
    title,
    description, 
  }


  // Define article form schema with specific error for each case. 
  let schema = Joi.object().keys({

    title:      
                Joi
                .string()
                .min(3)
                .max(30)
                .lowercase()
                .required()
                .messages({
                  "string.base": "Title is not valid",
                  'any.required': "Title is require",
                  'string.min': "Your title should contain at least 3 character", 
                  'string.max': "Your title should contain at last 30 character"
                }), 



                
    description: 
              Joi
              .string()
              .min(10)
              .required()
              .messages({
                "string.base": "Description is not valid",
                'any.required': "Description is require",
                'string.min': "Your description should contain at least 3 character", 
                'string.max': "Your description should contain at last 30 character"                
              }),
              
              
   

            
  });

  
  // check data is valid or not
  let {error} = schema.validate(newArticleText);



  // if any error render "pages/articles/newArticle" with proper error message
  if (error) return res.status(400).render('pages/articles/newArticle', {
    message: error.details[0].message, 
    messageClass: 'alert-danger'
  });


  // no error 
  next();
};
