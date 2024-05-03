const Team = require("../models/team")


const TeamController={
    getTeamsByDescription:async (description,name)=>{
        return await Team.find({Description:description,name:name});             
    },
    addTeam:async(req,res)=>{
        const sid= req.user._id.toString();
         console.log(sid)
         console.log(req.body.members)
          const { name, Description, members } = req.body;
          members.push(sid);

        const result=await Team.findOne({name:name,Description:Description})
        try{
            if(result!==null) res.send("Team existant")
            else {   
                const p= await Team.create({name,Description,members});
                res.send(p)
        
        }
    }
        catch(error){
            console.log(error)
        }
            },


    getTeam:async (req,res)=>{
        const teamsWhereUserIsMember = await Team.find({ members: { $in: [req.user._id] } }).populate({
            path: 'members',
            select: 'name Email',
          });
          
          res.send(teamsWhereUserIsMember)
    
    },
    deleteTeam:async (req,res)=>{
        const deletedTeam= await Team.findOneAndDelete({ _id:req.body}).then((deletedTeam) =>
        {
        if (deletedTeam) {
            res.send('Deleted Team:', deletedTeam)
        } 
        else {
            res.send('No Team found with the specified criteria.');
        }
        
        })
        .catch((error) => {
            console.error(error);
        });
    },
    updateTeam:async (req,res)=>{
        const TeamId=req.params.id;
        const updateData=req.body
        const updatedTeam= await Team.findByIdAndUpdate(TeamId,updateData,{new:true}).then((updatedTeam) =>
        {   
            if(updatedTeam) res.send(updatedTeam);
            else res.send("no team found with this id");
        }).catch((error)=>{
            res.send("error while updating");
        })
    }

}
module.exports=TeamController;