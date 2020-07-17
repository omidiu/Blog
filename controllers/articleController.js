const Article = require("../models/article");


/*********************************************************************************
* Display a specific article by id (GET)
**********************************************************************************/
exports.articleDetail = (req, res) => {
  res.send(`Not implemented yet: render "article/index.ejs" ${req.params.articleId}`);
};  






/*********************************************************************************
* Display a add new article page (GET)
**********************************************************************************/
exports.addNewArticlePage = (req, res) => {
  res.send(`Not implemented yet: render "article/newArticle.ejs" `);
};  



/*********************************************************************************
* Add a new article (POST)
**********************************************************************************/
exports.addNewArticle = (req, res) => {
  res.send(`Not implemented yet: add a new article `);
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







