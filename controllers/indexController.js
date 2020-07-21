const User = require('../models/user');




/*********************************************************************************
* Display index.ejs (after login) 'Should render with order date' (GET)
********************************************************************* *************/
exports.mainArticlePage = (req, res) => {
  res.render('pages/articles/index');
}; 


/*********************************************************************************
* Display signup page (GET)
**********************************************************************************/
exports.signupPage = (req, res) => {
  res.render('pages/signup');
};




/*********************************************************************************
* Display login page (GET)
**********************************************************************************/
exports.loginPage = (req, res) => {
  res.render('pages/login')
}





