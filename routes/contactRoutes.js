const express = require("express");
const  {getContacts,updateContact,deleteContact,createContact,getOneContact}=require("../controller/contactsController");
const validateToken = require("../middlWares/validateTokenHandler");

const router = express.Router();

router.use(validateToken)

router.route("/").get(getContacts)

router.route("/:id").get(getOneContact)

router.route("/").post(createContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

module.exports=router