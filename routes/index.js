const express = require('express') ; 
const router = express.Router() ; 
const userController = require('../controllers/user_controller') ; 
const Authenticate = require('../middlewares/authenticate');

router.post('/login' , userController.login) ;
router.post('/register' , userController.register) ;

router.get("/content", Authenticate , userController.content );


module.exports = router ; 

