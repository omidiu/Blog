const Article = require("../models/article");
const User = require('../models/user');
const helper = require('../tools/helpers');
const mongoose = require('mongoose');
const { find } = require("../models/article");


/*********************************************************************************
* Display all articles (GET)
**********************************************************************************/
exports.allArticles = async(req, res) => {

  try {

    // Get all articles (may limit later)
    let articles = await Article.find({});

    return res.send(articles);

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!")
  }
  

};  



/*********************************************************************************
* Display all user's articles (Everyone) (GET) 
**********************************************************************************/
exports.authorArticles = async(req, res) => {

  try {
    
    // Get username of Author
    let authorUsername = req.params.authorUsername;

    // Get author information 
    let author = await User.findOne({"username": authorUsername});
    if (!author) return res.status(404).render("pages/notfound") // if author not exist


    // check author articles
    let articles = await Article.find({author: author.id});
    res.status(200).render('pages/articles/specificAuthorArticles', {
      articles, 
      author
    });






  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred !")
  }
  

  


};  


/*********************************************************************************
* Display a specific article by id (GET) (404 problem)
**********************************************************************************/
exports.articleDetail = async(req, res) => {

  try {

    // Get article id 
    let articleId = req.params.articleId;


    // find article 
    let article = await Article.findOne({_id: articleId});


    // #issue
    // check article exist
    if (!article) return res.status(404).send("Not found");

    res.send(article); // should change to (render article page)


  } catch(err) {
    console.log(err);
    res.status(500).send("Error occured !")
  }
  

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







