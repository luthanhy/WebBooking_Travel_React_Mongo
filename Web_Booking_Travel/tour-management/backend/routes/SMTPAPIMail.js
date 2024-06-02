import express from 'express'
import dotenv from "dotenv";
import { SMTPSendMail } from "../utils/SMTPMail.js";

const route = express.Router();
dotenv.config();
var emailAdmin  ="technologyengineer7@gmail.com";
var emailPass ="zmwqmqovbzycsowd";
var emailDeliver ="luthanhy1@gmail.com";

route.get("/sendMail",async(res,req)=>{
    req = SMTPSendMail(emailAdmin,emailPass,emailDeliver);
});

export default route;







    
    

