import NodeMailer from "nodemailer";
import dotenv from "dotenv";
 
dotenv.config();
var emailAdmin  = "technologyengineer7@gmail.com";
var emailPass =  "zmwqmqovbzycsowd";
let info;
console.log("email",emailAdmin);
console.log("pass",emailPass);


const emails = 'nervergone111@gmail.com'

console.log(emails);
let transporter = NodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
        auth:{
            user: emailAdmin,
            pass: emailPass,
        }
 });
    try {
        info  = transporter.sendMail({
            from: "YOU",
            to:emails,
            subject:"Day lo lam do an cuoi ki di m",
            html: `<h1>TEST</h1><p>Bomaytest</p>`,
    });
    } catch (error) {
        console.log("",error);
    }
    

