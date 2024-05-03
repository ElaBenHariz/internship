const Per = require('../controllers/ProjectController');
const isAuth = require('../middlewares/userAuth');
const router=require('express').Router();


router.get('/get',isAuth,Per.getProjects);
router.get('/getPersProj',isAuth,Per.getPersoProjects);
router.post('/add',isAuth,Per.addProject);
router.delete('/delete/:id',isAuth,Per.deleteProj);
router.put('/update/:id',Per.updateProj);
router.get('/getTeamProject',isAuth,Per.getTeamProject);

module.exports=router;

