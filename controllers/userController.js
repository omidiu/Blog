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
  if ( req.params.username !== req.user.username) return res.status(404).send('<h1>Access Denied</h1>');
  
  // render user profile page.
  res.render("pages/users/edit", {user: user});
  


};  




/*********************************************************************************
* Edit profile (PUT)
**********************************************************************************/
exports.editBloggerInfo = (req, res) => {
  res.send('Not implemented yet: PUT Update blogger info after validation');
};  





/*********************************************************************************
* Display Blogger's articles page (GET)
**********************************************************************************/
exports.bloggerArticles = (req, res) => {
  res.send('Not implemented yet: render user/articles.ejs');
};






