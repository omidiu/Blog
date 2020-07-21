const express = require('express');
const router = express.Router();
const indexController = require("../controllers/indexController");
const validation = require('../tools/validation');




/*********************************************************************************
* Display pages/articles/index.ejs if authentication is successfully (GET)
********************************************************************* *************/
router.get('/', validation.authenticateToken, indexController.mainArticlePage);



/*********************************************************************************
* Display signup page (GET)
**********************************************************************************/
router.get('/signup', validation.redirectToMainPageWithValidtoken, indexController.signupPage);



/*********************************************************************************
* Display login page (GET)
**********************************************************************************/
router.get('/login', validation.redirectToMainPageWithValidtoken, indexController.loginPage);






module.exports = router;
