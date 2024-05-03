
const jwt=require('jsonwebtoken')
const user = require('../models/user')

const isAuth= (req,res,Next)=>{

    if(! req.headers.authorization || ! req.headers.authorization.startsWith('Bearer')){
        return res.status(401).json({msg:"not authorized"})
    }
    else{

        token=req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.TokenSecret,async (err,decoded)=>{
            
            if(err){
            return res.status(401).json({msg:"not authorized"}) }
            const u=await user.findById(decoded.id)
            req.user=u
            Next()
        })


}
}


module.exports=isAuth