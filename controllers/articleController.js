const Article = require("../models/article");
const {uploadSingleImage} = require('../tools/uploadSinglePicMulter');

/*********************************************************************************
* Display a specific article by id (GET)
**********************************************************************************/
exports.articleDetail = (req, res) => {



};  






/*********************************************************************************
* Display a add new article page (GET)
**********************************************************************************/
exports.addNewArticlePage = (req, res) => {
  res.send(`Not implemented yet: render "article/newArticle.ejs" `);
};  



/*********************************************************************************
* Add a new article text (Title, Description) (POST)
**********************************************************************************/
exports.addNewArticleText = async (req, res) => {
  try {
    // Get information
    let {title, description} = req.body
    let author = req.user._id;

    
    let newArticle = new Article({
      title, 
      description, 
      author, 
    });

    // save newArticle
    await newArticle.save();

    // if article successfully add
    return res.status(201).send("ok") // should redirect to article page

  } catch (err){
    console.log(err);
    return res.status(500).send("Error Occured !")
  }
    
  

  

  
};



/*********************************************************************************
* Add a new article image (POST)
**********************************************************************************/
exports.addNewArticleImage = async (req, res) => {

}; 




/*********************************************************************************
* Display edit article page (GET) 
**********************************************************************************/
exports.editArticlePage = (req, res) => {
  res.send(`Not implemented yet: show article edit page (1)  ${req.params.articleId} render ` );
};




/*********************************************************************************
* Edit a article (PUT)
**********************************************************************************/
exports.editArticle = (req, res) => {
  res.send(`Not implemented yet: edit a specific article ${req.params.articleId}`);
}



/*********************************************************************************
* Delete a new article (DELETE)
**********************************************************************************/
exports.deleteArticle = (req, res) => {
  res.send(`Not implemented yet: delete a specific article ${req.params.articleId}`);
};  







