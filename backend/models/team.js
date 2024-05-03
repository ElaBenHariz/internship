const mongoose=require('mongoose');

const teamschema=mongoose.Schema(

    {
        name:String,
        Description: String,
        members:{
            type: [{type: mongoose.Types.ObjectId, ref:'user'}],
            default:[]
        }
    }
);
const Team=mongoose.model('team',teamschema);
module.exports=Team;