const User = require('../models/user');


/*********************************************************************************
* Display signup page
**********************************************************************************/
exports.signupPage = (req, res) => {
  res.send("Not implemented yet: render signup.ejs page"); 
};




/*********************************************************************************
* Display login page
**********************************************************************************/
exports.loginPage = (req, res) => {
  res.send('Not implemented yet: render login.ejs page');
}




/*********************************************************************************
* add new Blogger
**********************************************************************************/
exports.addBlogger = (req, res) => {
  res.send('Not implemented yet: add blogger after validation')
}





/*********************************************************************************
* login Blogger
**********************************************************************************/
exports.loginBlogger = (req, res) => {
  res.send('Not implemented yet: login Blogger');
};  


/*********************************************************************************
* Display index.ejs (after login) 'Should render with order date'
**********************************************************************************/
exports.mainArticlePage = (req, res) => {
  res.send('Not implemented yet: render index.ejs and show all articles')
};  



