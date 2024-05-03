const ListController = require('../controllers/ListController');
const isAuth = require('../middlewares/userAuth');
const router=require('express').Router()

router.get('/get/:projectId',isAuth,ListController.getLists);
router.post('/add/:projectId',isAuth,ListController.CreateList);
router.delete('/delete/:listId',isAuth,ListController.deleteList);
router.put('/updateName/:listId',isAuth,ListController.updateName);
router.post('/addCardToList/:listId',isAuth,ListController.addCardToList)
router.post('/moveCardToList',isAuth,ListController.moveCardToList)
router.post('/deleteCardFromList',isAuth,ListController.deleteCardFromList)
module.exports = router;