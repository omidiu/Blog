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
* Display user's articles (logged in author) (GET) 
**********************************************************************************/
router.get('/myArticles', validation.authenticateToken, ArticleController.userArticles)



/*********************************************************************************
* Display all author's articles (GET)
**********************************************************************************/
router.get('/:authorUsername', validation.authenticateToken, ArticleController.authorArticles)





/*********************************************************************************
* Display a add new article page (GET) 
**********************************************************************************/
router.get("/article/newArticle", validation.authenticateToken, ArticleController.addNewArticlePage); 




/*********************************************************************************
* Display a specific article by id (GET)
**********************************************************************************/
router.get("/article/:articleId", validation.authenticateToken, ArticleController.articleDetail);




/*********************************************************************************
* Display a edit article page by id (GET)
**********************************************************************************/
router.get("/article/:articleId/edit", validation.authenticateToken, ArticleController.editArticlePage);






/*********************************************************************************
* Add a new article (POST)
**********************************************************************************/
router.post("/newArticle", validation.authenticateToken, validation.addArticleFormImage, validation.addArticleFormText, ArticleController.addNewArticle);





module.exports = router;
