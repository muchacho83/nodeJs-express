const mongoose =require("mongoose");

const contactSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Contact Name Required"]
    },
    email:{
        type:String,
        required:[true]
    },
    mobile:{
        type:String,
        required:[true]
    }
})

module.exports=mongoose.model("ContactSchema",contactSchema)