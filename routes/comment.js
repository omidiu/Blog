const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const validation = require("../tools/validation");







/*********************************************************************************
* Add a comment to a specific article (POST) (Not implemented yet)
**********************************************************************************/
router.post("/:articleId", validation.authenticateToken, commentController.addCommentToArticle);







module.exports = router;