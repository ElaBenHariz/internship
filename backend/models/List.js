
const { default: mongoose } = require("mongoose");

const CardSchemas=mongoose.Schema(
    {
        Title :{type:String,required: true},
        Description:{type: String, required: true},
        DueDate: Date,
        Labels:{type:[String] ,default: []},
        Files: [{ FileName: String, url: String }],
        Position: Number,
    }
)
const ListSchema =mongoose.Schema(
    {
        name:{ type: String ,required:true},
        position:{ type:Number},
        Project: { type: mongoose.Schema.Types.ObjectId,ref: 'Project' },
        cards:{type:[CardSchemas],default:[]}

    }
)

const List=mongoose.model('List',ListSchema);
module.exports=List;