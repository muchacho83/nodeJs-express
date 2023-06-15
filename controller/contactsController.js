const asyncHandler = require("express-async-handler")
const contactSchema=require("../models/contactModel")
const { constants } = require("../constants");

//@Get
const getContacts= asyncHandler(async (req,res)=>{
    const contacts=await contactSchema.find({userId:req.user.id})
    res.status(200).json(contacts)
})
//@Get-One

const getOneContact= asyncHandler(async (req,res)=>{
    if(!req.params.id){
        res.status(constants.VALIDATION_ERROR)
        throw new Error("Id is required")
    }

    const contact= await contactSchema.findById(req.params.id)
    if(!contact){
        res.status(constants.NOT_FOUND)
        throw new Error("Not Found")
    }
    res.status(200).json(contact)
})


//@Post
const createContact= asyncHandler(async (req,res)=>{
    if(!req.body.name || !req.body.email ||!req.body.mobile){
        res.status(constants.VALIDATION_ERROR)
        throw new Error("all fields are mandatory")
    }
    const contact= await contactSchema.create({
        userId:req.user.id,
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile
    })
    res.status(201).json(contact)
})

//@Put
const updateContact= asyncHandler(async(req,res)=>{

    const contact = await contactSchema.findById(req.params.id)
    if(!contact || contact.userId.toString()!==req.user.id){
        res.status(constants.NOT_FOUND)
        throw new Error("Not Found")
    }   

    const updatedContact= await contactSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})

    
    res.status(200).json(updatedContact)
})

//@Delete
const deleteContact= asyncHandler(async(req,res)=>{
    const contact= await contactSchema.findById(req.params.id)
    if(!contact ||contact.userId.toString() !== req.user.id){
        res.status(constants.NOT_FOUND)
        throw new Error("Not Found")
    }
    const deletedContact= await contactSchema.findOneAndDelete(req.params.id)
    res.status(200).json(deletedContact)
})

module.exports={getContacts,createContact,updateContact,deleteContact,getOneContact}