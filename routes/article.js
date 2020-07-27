const express = require('express');
const router = express.Router();
const ArticleController = require("../controllers/articleController");
const validation = require("../tools/validation");



/*********************************************************************************
* Display a specific article by id (GET)
**********************************************************************************/
router.get("/:articleId", validation.authenticateToken, ArticleController.articleDetail);



/*********************************************************************************
* Add a new article (POST)
**********************************************************************************/
router.post("/newArticleText", validation.authenticateToken, validation.addArticleForm, ArticleController.addNewArticleText);





module.exports = router;
