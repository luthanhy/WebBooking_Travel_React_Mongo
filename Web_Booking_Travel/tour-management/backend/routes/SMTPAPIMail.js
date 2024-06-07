import express from 'express';
import dotenv from 'dotenv';
import { SMTPSendMail } from "../utils/SMTPMail.js";

dotenv.config();

const route = express.Router();

const emailAdmin = process.env.EMAIL_ADMIN || "";
const emailPass = process.env.EMAIL_PASS || "";

route.post("/sendMail", async (req, res) => {
    const { email } = req.body;
    try {
        await SMTPSendMail(emailAdmin, emailPass, email);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error('Error in /sendMail route:', error.message);
        res.status(500).send("Failed to send email");
    }
});


export default route;
