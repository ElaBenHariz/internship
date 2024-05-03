
const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const ProjectRoutes=require('./routes/ProjectRoutes')
const UserRoutes=require('./routes/UserRoutes')
const ListsRoutes=require('./routes/ListsRoutes')
const TeamRoutes=require('./routes/TeamRoutes');
const connect = require('./helpers/DbConnect');
const bodyParser = require('body-parser');
const cors=require('cors')



const server=express()
server.use(bodyParser.json())
server.use(cors());
const port=process.env.port
server.listen(port)
connect();
server.use('/users',UserRoutes);
server.use('/projects',ProjectRoutes);
server.use('/teams',TeamRoutes);
server.use('/lists',ListsRoutes)


