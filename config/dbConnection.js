const mongoose=require('mongoose')

const connectDb=async() =>{
    try{
        const connect=await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("database connected")
    }catch(err){
        console.log(err),
        process.exit(1)
    }
}
module.exports=connectDb