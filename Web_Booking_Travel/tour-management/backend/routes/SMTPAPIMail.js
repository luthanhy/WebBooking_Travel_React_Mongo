import express from 'express'
import dotenv from "dotenv";
import { SMTPSendMail } from "../utils/SMTPMail.js";

const route = express.Router();
dotenv.config();

var emailAdmin  = process.env.EMAIL_ADMIN || "";
var emailPass = process.env.EMAIL_PASS || "";


// var emailDeliver ="luthanhy1@gmail.com";
const req = SMTPSendMail(emailAdmin,emailPass,"namchau2003@gmail.com");
// route.get("/sendMail",async(res,req)=>{
//     const emailDeliver = req.body;
//     console.log("",emailDeliver);
//     req = SMTPSendMail(emailAdmin,emailPass,emailDeliver);
// });

export default route;

