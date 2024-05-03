
const mongoose=require('mongoose');
const Userschema=mongoose.Schema(
    {
        Email: String,
        name:String,
        Password:String
    }
    
    );

    const user=mongoose.model('user',Userschema);
    module.exports=user;