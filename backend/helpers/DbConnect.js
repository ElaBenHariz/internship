
const mongoose=require('mongoose');
require('dotenv').config();


const connect=()=>{
    const baseurl=process.env.dburl;
    mongoose.connect(baseurl).then(()=> {console.log('connected to database');}).catch(console.error());
}
module.exports=connect;