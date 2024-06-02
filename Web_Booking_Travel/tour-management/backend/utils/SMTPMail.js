import NodeMailer from "nodemailer";

export const SMTPSendMail = async(email,pass,deliver) =>{
    let info;
    try {
        let transporter = NodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure:true,
                auth:{
                    user: email,
                    pass: pass,
                }
         });
        info  = transporter.sendMail({
            from: "YOU",
            to:deliver,
            subject:"LO Ma Lam Do AN di May Thang LOL",
            html: `<h1>TEST</h1><p>Bomaytest</p>`,
    });
    } catch (error) {
        console.log("",error);
    }
}