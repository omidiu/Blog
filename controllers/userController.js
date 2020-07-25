require('dotenv').config();

const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 8;

/*********************************************************************************
* add new Blogger (POST)
**********************************************************************************/
exports.signUpBlogger = async(req, res) => {
  try {
    // get information from request body. (password_confirmation is not necessary anymore. 
    // validated in previuous middleware. )
    let {firstName, lastName, username, password, sex, mobile} = req.body;

    // check username exist
    const userExist = await User.findOne({username: username});
    if (userExist) return res.status(400).send('This username is already exist');


    // check mobile exist
    const mobileExist = await User.findOne({mobile: mobile});
    if (mobileExist) return res.status(400).send('This number is already exist');

    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    

    // create user
    const user = new User({
      firstName: firstName,
      lastName: lastName, 
      username: username, 
      password: hashedPassword, 
      sex: sex, 
      mobile: mobile
    });

    // save user
    const savedUser = await user.save(user);
    res.status(201).send("created successfully");



  } catch (err) {
    console.log(err);
    res.status(500).send(); // internal server error
  }
  
}


/*********************************************************************************
* login Blogger (POST)
**********************************************************************************/
exports.loginBlogger = async(req, res) => {
  try {
    
    // get information from request body.
    let {username, password} = req.body;

    // if username or password is empty
    if (!username || !password) {
      return res.status(400).render('pages/login', {message: "username or password shouldn't be empty"});
    }

    // check user with this username exist 
    const user = await User.findOne({username: username});
    if (!user) return res.status(400).render('pages/login', {message: "username does not exist"});
    

    // checkpassword correct 
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) return res.status(400).render('pages/login', {message: "password is not correct"});


    
    //create and assign a token
    const token = jwt.sign({_id : user._id, username: username} , process.env.TOKEN_SECRET)
    res.cookie("token", token);


    // should change to 
    res.send("token sent ");




  } catch (err) {
    console.log(err);
    res.status(500).send(); // internal server error
  }
  

  

  

};  


/*********************************************************************************
* Display Blogger profile page (GET)
**********************************************************************************/
exports.bloggerDetailsPage = async (req, res) => {
  
  // get username
  let { username }  = req.params;

  // check username exist or not
  let user =  await User.findOne({username: username});
  if (!user) return res.status(404).send("Not found") // It should change to not found page.

  
  // render user profile page.
  res.render("pages/users/index", {user: user});
  

};  


/*********************************************************************************
* Display edit profile page (GET)
**********************************************************************************/
exports.bloggerEditProfilePage = async (req, res) => {
  
  // get username
  let { username }  = req.params;

  // check username exist or not
  let user =  await User.findOne({username: username});
  if (!user) return res.status(404).send("Not found") // It should change to not found page.


  // user can just edit his/her profile.
  // access denied message
  // if user try see another blogger edit page
  // (req.user was set in authenticateToken middleware before this)
  if ( req.params.username !== req.user.username) return res.status(403).send('<h1>Access Denied</h1>');
  
  // render user profile page.
  res.render("pages/users/edit", {user: user});
  


};  




/*********************************************************************************
* Edit profile (PUT)
**********************************************************************************/
exports.editBloggerInfo = async (req, res) => {
  try {
    // get username
    let { username }  = req.params;
    let {firstName, lastName, sex, mobile} = req.body;

    let newUserInfo = {
      firstName: firstName, 
      lastName: lastName, 
      sex: sex, 
      mobile: mobile
    }

    // check username exist or not
    let user =  await User.findOne({username: username});
    if (!user) return res.status(400).send("Bad request") // It should change to not found page.


    // user can just edit his/her profile.
    // access denied message
    // if user try see another blogger edit page
    // (req.user was set in authenticateToken middleware before this)
    if ( req.params.username !== req.user.username) return res.status(403).send('<h1>Access Denied</h1>');


    

    let updateUserInfo = await User.findOneAndUpdate({username: username}, newUserInfo, {
      new: true
    });

    
    res.status(200).render("pages/users/edit", {
      message: "edited successfully", 
      messageClass: "alert-success"
    });

  } catch(err) {
    return res.status(500).send(err);
  }
  
};  



exports.changePassword = async (req, res) => {

  try {
      // get new password from req.body
    let {newPass} = req.body;

    // get username
    let username = req.user.username;

    // hash new password
    let hashedNewPassword = await bcrypt.hash(newPass, saltRounds);

    // update password
    await User.findOneAndUpdate({username: username}, {password: hashedNewPassword}); // I'll fix this


    // successful 
    res.status(200).render('pages/users/edit', {
      message: "Your password updated successfully", 
      messageClass: "alert-success"
    })


  } catch (err) {
    console.log(err);
    return res.status(500).send("<h1>Internal server error</h1>")
  }
  

}






/*********************************************************************************
* Display Blogger's articles page (GET)
**********************************************************************************/
exports.bloggerArticles = (req, res) => {
  res.send('Not implemented yet: render user/articles.ejs');
};






