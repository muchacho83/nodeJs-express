const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const { constants } = require("../constants");

const validateToken=asyncHandler(async(req,res,next) =>{
    let token;
    let authHeader=req.header.Authorization || req.headers.authorization;
    console.log(authHeader)
    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(constants.UNAUTHORIZED)
                throw new Error("Not Authorized")
            }
            req.user=decoded.user
            next();
        })
        
    }else{
        res.status(constants.UNAUTHORIZED);
        throw new Error("Not Authorized")
    }
})

module.exports=validateToken