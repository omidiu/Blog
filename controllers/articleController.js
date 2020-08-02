const Article = require("../models/article");
const User = require('../models/user');
const helper = require('../tools/helpers');
const mongoose = require('mongoose');



/*********************************************************************************
* Display all articles (GET)
**********************************************************************************/
exports.allArticles = async(req, res) => {

  try {

    // Get all articles (may limit later)
    let articles = await Article.find({});

    return res.render('pages/articles/index', {
      articles
    });


  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!")
  }
  

};  



/*********************************************************************************
* Display all author's articles (Everyone) (GET) 
**********************************************************************************/
exports.authorArticles = async(req, res) => {

  try {
    
    // Get username of Author
    let authorUsername = req.params.authorUsername;

    // Get author information 
    let author = await User.findOne({"username": authorUsername});
    if (!author) return res.status(404).render("pages/notfound") // if author not exist

    let authorObject = author.toObject();

    delete authorObject.password; // remove password


    // check author articles
    let articles = await Article.find({author: author.id});
    res.status(200).render('pages/articles/specificAuthorArticles', {
      articles, 
      authorObject
    });






  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred !")
  }


};






/*********************************************************************************
* Display user's articles (logged in author) (GET) 
**********************************************************************************/
exports.userArticles = async (req, res) => {

  try {

    // Get author username
    let authorId = req.user._id; 

    // Get author
    let author = await User.findOne({_id: authorId})
    let authorObject = author.toObject();
    
    delete authorObject.password;

    // Get author articles 
    let articles = await Article.find({author: authorId});
    res.status(200).render('pages/articles/userArticles', {
      articles, 
      authorObject
    })


  } catch (err) {
    console.log(err);
    res.status(500).send("Err occurred")
  }
};  









/*********************************************************************************
* Display a specific article by id (GET)
**********************************************************************************/
exports.articleDetail = async(req, res) => {

  try {


    // Get article id 
    // let articleId = req.params.articleId;
    let articleId = req.params.articleId;

    // check id is valid or not
    if (!mongoose.Types.ObjectId.isValid(articleId)) res.status(400).send("Bad Request");

    
    // find article 
    let article = await Article.findById({_id: articleId});
    if (!article) res.status(404).render("pages/Notfound") // if article is empty




    // #issue
    // check article exist
    if (!article) return res.status(404).send("Not found");

    res.status(200).render('pages/articles/oneArticle', {
      article
    }); // should change to (render article page)


  } catch(err) {
    console.log(err);
    res.status(500).send("Error occured !")
  }
  

};  






/*********************************************************************************
* Display a add new article page (GET) 
**********************************************************************************/
exports.addNewArticlePage = (req, res) => {
  res.render("pages/articles/newArticle");
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
* Display edit article page (GET)
**********************************************************************************/
exports.editArticlePage = async (req, res) => {
  
  try {

    // Get article id 
    // let articleId = req.params.articleId;
    let articleId = req.params.articleId;

    // check id is valid or not
    if (!mongoose.Types.ObjectId.isValid(articleId)) return res.status(400).send("Bad Request");

    
    // find article 
    let article = await Article.findById({_id: articleId});
    if (!article) res.status(404).render("pages/Notfound"); // if article is not exist.



    // get author id (string)
    let authorId = req.user._id
    


    // check user have permission to edit or not
    if (article.author._id != authorId) return res.status(403).send('<h1>Access Denied</h1>');



    
    res.status(200).render('pages/articles/oneArticle', {
      article
    }); // should change to (render article page)


  } catch(err) {
    console.log(err);
    res.status(500).send("Error occured !")
  }
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







