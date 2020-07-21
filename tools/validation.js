const Joi = require("@hapi/joi");

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

  // if any error send it to client (400: Bad Request)
  if (error) return res.status(400).send(error.details[0].message);

  // no error 
  next();
    
  
}



exports.loginForm = (req, res, next) => {
  // get information from request body.
  let {username, password} = req.body;

  let userDataForLogin = {
    username: username, 
    password: password
  };
  
  // schema
  let schema = Joi.object().keys({
    
      
    username: Joi
              .required()
              .messages({
                'any.required': "username is require"
              }),
              
              
    password: Joi
              .required()
              .messages({
                'any.required': "password is require"
              }),


    
            
  });

  // check data is valid or not
  let {error} = schema.validate(userDataForLogin);

  // if any error send it to client (400: Bad Request)
  if (error) return res.status(400).send(error.details[0].message);

  // no error 
  next();


}


/*********************************************************************************
* For all route except "users/login" and "users/signup"
**********************************************************************************/
exports.authenticateToken = async(req, res, next) => {
  
  // get token on cookie
  const token = req.cookies["token"];

  // if no token sets
  if (token == null) return res.redirect('/users/login') // no token means user should login or register first


  // check token is valid or not
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect('/users/login');  // user should login

    // set req.user for next middleware
    req.user = user;

    // give controll to next middleware
    next();
  });
    
  
  
};




/*********************************************************************************
* For just "users/login" and "users/signup" route.
**********************************************************************************/
exports.redirectToMainPageWithValidtoken = async(req, res, next) => {

  // Gather the jwt access token from the request header
  const token = req.cookies["token"];
  if (token == null) next(); // no token means user should login or register


  // verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) next(); // no valid token means user should login or register
    
    // should redirect user to main page
    res.redirect('pages/articles/index'); // change later. Should pass articles in JSON.
  });
    
  
  
};



  
