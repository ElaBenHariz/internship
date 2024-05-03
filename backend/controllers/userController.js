const user=require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator= require('validator')

const userController={

    add:async (req,res)=>
    {
    const {Email,name,Password}=req.body
    const result=await user.findOne({Email:Email})
    try{
        if(result!==null) res.send("User exists")

        else {   
        user.create({Email,name,Password});
        res.send("Created");}
    
    }
    catch(error){
        console.log(error)
    }
    },
    getAll: async (req,res)=>
    {

    const users= await user.find({ _id: { $ne: req.user._id } });
    res.send(users)
    },
    getSpecificUsers: async (req,res)=>{
        const {members}=req.body
        console.log(members)
        const users= await user.find({ _id: { $in: members } });
        res.send(users)
    },

    deleteUser:async (req,res)=>{
        const deletedUser= await user.findOneAndDelete({ _id:req.body}).then((deletedUser) =>
        {
        if (deletedUser) {
            res.send('Deleted User:', deletedUser)
        } 
        else {
            res.send('No User found with the specified criteria.');
        }
        
        })
        .catch((error) => {
            console.error(error);
        });
    },
    updateUser:async (req,res)=>{
        const UserId=req.params.id;
        const updateData=req.body
        const updatedUser= await user.findByIdAndUpdate(UserId,updateData,{new:true}).then((updatedUser) =>
        {   
            if(updatedUser) res.send(updatedUser);
            else res.send("no User found with this id");
        }).catch((error)=>{
            res.send("error while updating");
        })
    },

    register:async (req,res)=>{
        const {Email,name,Password}=req.body;
        // null fields
        if( !Email || !Password || !name ){
            return res.status(400).json({msg:"Please fill all fields"});   
        }
        // user exists
        if(await user.findOne({Email})){
            return res.status(400).json({msg:"User already exists"})
        }

        //email or password validation 
        if(! validator.isEmail(Email)){  return res.status(400).json({msg:" Email is not valid"})   }
        if(! validator.isStrongPassword(Password)){  return res.status(400).json({msg:" password is not valid"})   }


        //if no problem create the new user
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(Password,salt);
        const Newuser=await user.create(
            {Email,
            name,
            Password: hashedPassword} 
        )
        if(Newuser){
          return  res.status(201).json({
                id:Newuser._id,
                email:Newuser.Email,
                Name:Newuser.name,
                token: genToken(Newuser._id)
            })
        } 
     
    },
    login:async (req,res)=>{
        const {Email,Password}=req.body;
        if( !Email || !Password ){
            return res.status(400).json({msg:"Please fill all fields"});   
        }
        const UserFound=await user.findOne({Email})
        if(!UserFound ){
            return res.status(400).json({msg:"User doesn't exists"})
        }
        const isMatch=bcrypt.compare(Password,UserFound.Password)
        if(!isMatch){
            return res.status(400).json({msg:" wrong password"})
        }
        res.status(200).json({
            id:UserFound._id,
            email:UserFound.Email,
            Name: UserFound.name,
            token:genToken(UserFound._id)
        })
    },
    account:(req,res)=>{
        return res.status(200).json({
            id:req.user._id,
            email:req.user.Email,
            name:req.user.name
        })
    }

}
const genToken= (id)=>{
    return  jwt.sign({id},process.env.TokenSecret,{expiresIn:'30d'})
}
module.exports=userController;