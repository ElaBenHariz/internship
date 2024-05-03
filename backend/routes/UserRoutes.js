const express=require('express');
const userController = require('../controllers/userController');
const isAuth = require('../middlewares/userAuth');
const router=express.Router();



router.post('/add',userController.add);
router.get('/get',isAuth,userController.getAll);
router.post('/getSpesific',userController.getSpecificUsers);
router.delete('/deleteOne',userController.deleteUser);
router.put('/update/:id',userController.updateUser);


router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/userAccount',isAuth, userController.account)
module.exports=router;

