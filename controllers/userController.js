const User = require("../models/user");


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






