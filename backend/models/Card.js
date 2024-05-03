const { default: mongoose, model } = require("mongoose");

const CardSchemas=mongoose.Schema(
    {
        Title :{type:String,required: true},
        Description:{type: String, required: true},
        DueDate: Date,
        Labels:{type:[String] ,default: []},
        Files: {type:[{ FileName: String, url: String }],default:[]},
        Position: Number,
        ListContainer: {type: mongoose.Types.ObjectId,ref:'List'}
    }
)

const Card=mongoose.model('Card',CardSchemas)
module.exports=Card;