const {uploadImage} = require('../tools/uploadArticleAvatarImage');
const express = require('express');
const router = express.Router();
const ArticleController = require("../controllers/articleController");
const validation = require("../tools/validation");


/*********************************************************************************
* Display all articles (limit later) (GET)
**********************************************************************************/
router.get('/', validation.authenticateToken, ArticleController.allArticles)





/*********************************************************************************
* Display a specific article by id (GET) (404 problem)
**********************************************************************************/
router.get("/:articleId", validation.authenticateToken, ArticleController.articleDetail);



/*********************************************************************************
* Add a new article (POST)
**********************************************************************************/
router.post("/newArticle", validation.authenticateToken, validation.addArticleFormImage, validation.addArticleFormText, ArticleController.addNewArticle);





module.exports = router;
