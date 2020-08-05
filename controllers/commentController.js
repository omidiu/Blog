const Comment = require('../models/comment');
const Article = require('../models/article');
const mongoose = require('mongoose');




/*********************************************************************************
* Add a comment to a specific article (POST)
**********************************************************************************/
exports.addCommentToArticle = async (req, res) => {

  


  try {

    // Get article id.
    let articleId = req.params.articleId;

    // Get author id in token.
    let authorId = req.user._id;

    // Get comment content
    let commentContent = req.body.content;

    // Check article id is valid or not
    if (!mongoose.Types.ObjectId.isValid(articleId)) res.status(400).send("Bad Request");


    
    // find article 
    let article = await Article.findById({_id: articleId});
    if (!article) res.status(400).json({
      message: "Article not found"
    }) // if article is empty


    // check comment is empty or not
    if (!commentContent) 
      return res.status(400).json({
        message: "Your comment can't be empty"
      }); 

    

    const comment = new Comment({
      content: commentContent,
      author: authorId,
      article: articleId
    });



    const savedComment = await comment.save();

    res.status("200").json({
      message: "Your comment added successfully, refresh the page to see your comment"
    }); // should change later maybe



  } catch(err) {
    console.log(err);
    res.status(500).send("Error Occurred !!");
  }
  
  
};  





