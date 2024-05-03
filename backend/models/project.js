const mongoose = require('mongoose');

const projectschema = mongoose.Schema({
  name: {
    type: String,
    required: true
        },
  description: {
    type:String,
    required:true
  },
  files: [{ FileName: String, url: String }],

  isTeamProject: {
    type: Boolean,
    default:false
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    default:null
  },
  team:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Team',
    default:null
  },
});

const Project = mongoose.model('Project', projectschema);
module.exports=Project;






