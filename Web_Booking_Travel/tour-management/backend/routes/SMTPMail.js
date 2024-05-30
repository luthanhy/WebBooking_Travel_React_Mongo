import NodeMailer from "nodemailer";
import dotenv from "dotenv";
 
dotenv.config();
const emailAdmin  = process.env.USER_SMTP || "";
const emailPass = process.env.PASS_SMTP || "";

const emails = 'luthanhy1@gmail.com'

async function main(){
    let transporter = NodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
        auth:{
            user: emailAdmin,
            pass: emailPass,
        }
    });
    let info  = transporter.sendMail({
            from: "YOU",
            to:emails,
            subject:"TEST",
            html: `<h1>TEST</h1><p>Bomaytest</p>`,
    });
    console.log(info.messageId);
    console.log(info.accepted); // Array of emails that were successful
    console.log(info.rejected); // Array of unsuccessful emails

main()
.catch(err => console.log(err));
}