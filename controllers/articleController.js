const Article = require("../models/article");
const multer = require('multer');
const {uploadImage} = require('../tools/uploadArticleAvatarImage');

/*********************************************************************************
* Display a specific article by id (GET) (Not implemented yet)
**********************************************************************************/
exports.articleDetail = (req, res) => {



};  






/*********************************************************************************
* Display a add new article page (GET) (Not implemented yet)
**********************************************************************************/
exports.addNewArticlePage = (req, res) => {
  res.send(`Not implemented yet: render "article/newArticle.ejs" `);
};  



/*********************************************************************************
* Add a new article (POST) 
**********************************************************************************/
exports.addNewArticle = async (req, res, next) => {
  

  try {
    // Get information 
    let {title, description} = req.body;
    let authorId = req.user._id;
    let avatarSrc = res.locals.filename;
    
    let newArticle = new Article({
      title, 
      description, 
      author: authorId,
      avatarSrc 
    });

    // save newArticle
    await newArticle.save();

    // if article successfully add
    return res.status(201).send("article created successfully"); // should redirect to article page

  } catch (err){
    console.log(err);
    return res.status(500).send("Error Occured !")
  }
    
  

  

  
};




/*********************************************************************************
* Display edit article page (GET) (Not implemented yet)
**********************************************************************************/
exports.editArticlePage = (req, res) => {
  res.send(`Not implemented yet: show article edit page (1)  ${req.params.articleId} render ` );
};




/*********************************************************************************
* Edit a article (PUT) (Not implemented yet)
**********************************************************************************/
exports.editArticle = (req, res) => {
  res.send(`Not implemented yet: edit a specific article ${req.params.articleId}`);
}



/*********************************************************************************
* Delete a new article (DELETE) (Not implemented yet)
**********************************************************************************/
exports.deleteArticle = (req, res) => {
  res.send(`Not implemented yet: delete a specific article ${req.params.articleId}`);
};  







