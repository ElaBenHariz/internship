const TeamController = require("../controllers/TeamController");
const r = require('express').Router();
const isAuth = require('../middlewares/userAuth');

r.get('/getTeam',isAuth,TeamController.getTeam);
r.post('/addTeam',isAuth,TeamController.addTeam);
r.delete('/deleteOne',TeamController.deleteTeam);
r.put('/update/:id',TeamController.updateTeam);
module.exports=r;
