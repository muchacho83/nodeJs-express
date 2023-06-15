const express = require("express");
const dotEnv = require("dotenv").config();
const port = process.env.PORT || 5000;
const contactRouter=require("./routes/contactRoutes");
const userRouter =require("./routes/userRoutes")
const errHandler = require("./middlWares/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb()
const app = express();

app.use(express.json())
app.use("/api/contacts",contactRouter );
app.use("/api/user",userRouter );
app.use(errHandler)
app.listen(port);
