const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 8;

/*********************************************************************************
* add new Blogger (POST)
**********************************************************************************/
exports.signUpBlogger = async(req, res) => {
  try {
    // get information from request body.
    let {firstName, lastName, username, password, password_confirmation, sex, mobile} = req.body;

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
      password: password, 
      password_confirmation: password_confirmation, 
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
exports.loginBlogger = (req, res) => {
  res.send('Not implemented yet: login Blogger');
};  


/*********************************************************************************
* Display Blogger page (GET)
**********************************************************************************/
exports.bloggerDetail = (req, res) => {
  res.send("Not implemented yet: render user/user.ejs"); 
};  


/*********************************************************************************
* Display edit profile page (GET)
**********************************************************************************/
exports.bloggerEditProfilePage = (req, res) => {
  res.send('Not implemented yet: render user/edit.ejs');
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






