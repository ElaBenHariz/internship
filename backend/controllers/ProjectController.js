const Project=require('../models/project')
const List=require('../models/List')
const Card=require('../models/Card')
const Team=require( '../models/team') 

const ProjectController={
    getPersoProjects:async(req,res)=>{
        const p= await Project.find({owner:req.user._id});

        res.send(p);
        },
    getTeamProject:async (req,res)=>{
        const teamsWhereUserIsMember = await Team.find({ members: { $in: [req.user._id] } });
        const teamIds = teamsWhereUserIsMember.map(team => team._id);
        const p=await Project.find( { team: { $in: teamIds } });
        res.send(p)
    }    ,
getProjects:async(req,res)=>{
    const teamsWhereUserIsMember = await Team.find({ members: { $in: [req.user._id] } });
    const teamIds = teamsWhereUserIsMember.map(team => team._id);
    
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { team: { $in: teamIds } },
      ],
    });
    res.send(projects);
    },



    addProject: async (req,res)=>{
    const {name,description,files,isTeamProject,owner,team}=req.body 
    try{
        if(isTeamProject){
            const result= await Project.find({ name: name, team: team });
            if(result.length>0){
                res.send("This project alreaady exists and is assigned to this team")
            }
            else{
              const newp=await   Project.create({name,description,files,isTeamProject,team});
                res.send(newp)
            }
        }
       else{
            const result= await Project.find({ name:name, owner: req.user._id });
            if(result.length>0){
                console.log(result)
                res.send("This project already exists with the same user")
            }
            else{
              const newproj=await  Project.create({name,description,files,isTeamProject,owner:req.user._id});
                res.send(newproj)
            }
        }
    }
        catch(error){
        console.error(error);
        }
    },
    
    deleteProj:async (req,res)=>{
        const ProjectId=req.params.id;
        const deletedDocument= await Project.findByIdAndDelete(ProjectId).then(async (deletedDocument) =>
        {
        if (deletedDocument) {
            await List.deleteMany({Project:ProjectId})
            console.log(deletedDocument)
            res.send(deletedDocument._id)
        } 
        else {
            console.log('No project found with the specified criteria.');
            res.send('No project found with the specified criteria.');
        }
        
        })
        .catch((error) => {
            console.error(error);
        });
    },


    updateProj:async (req,res)=>{
        const ProjectId=req.params.id;
        const updateData=req.body
        const updatedDocument= await Project.findByIdAndUpdate(ProjectId,updateData,{new:true}).then((updatedDocument) =>
        {   
            if(updatedDocument) res.send(updatedDocument);
            else res.send("no project found with this id");
        }).catch((error)=>{
            res.send("error while updating");
        })
    }


}
module.exports=ProjectController;
