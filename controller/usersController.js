const asyncHandler=require("express-async-handler")
const userSchema =require("../models/userModel")
const { constants } = require("../constants")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")

const registerUser=asyncHandler(async (req,res)=>{
    const {firstName,lastName,email,username,password}=req.body
    if(!firstName || !lastName || !email  ||!password){
        res.status(constants.VALIDATION_ERROR)
        throw new Error("Invalid Format")
    }
    const user= await userSchema.findOne({email})
    if(user){
        res.status(constants.VALIDATION_ERROR)

        throw new Error("user already Exists")
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const registeredUser= await userSchema.create({
        firstName,
        lastName,
        email,
        username,
        password:hashedPassword
    });
    res.status(200).json({
        id:registeredUser.id,
        email:registeredUser.email
    })
})

const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email|| !password){
        res.status(constants.VALIDATION_ERROR)
        throw new Error("All fields are mandatory")
    }
    const user = await userSchema.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){

        const accessToken=jwt.sign({
            user:{
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN,{
            expiresIn:"30m"
        })
        res.status(constants.OK).json({accessToken})
    }else{
        res.status(constants.UNAUTHORIZED)
        throw new Error("credentials not valid")
    }

})
const currentUser=asyncHandler(async(req,res)=>{
    res.status(constants.OK)
    res.json(req.user)
})

module.exports={registerUser,loginUser,currentUser}