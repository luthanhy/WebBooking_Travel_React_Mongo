import express from 'express';
import dotenv from 'dotenv';
import { SMTPSendMail, sendOTPEmail } from "../utils/SMTPMail.js";

dotenv.config();

const route = express.Router();

const emailAdmin = process.env.EMAIL_ADMIN || "";
const emailPass = process.env.EMAIL_PASS || "";

// Route to send regular email
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

// Route to send OTP email
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Tạo mã OTP 6 chữ số
};

route.post("/sendOTP", async (req, res) => {
    const { email } = req.body;
    try {
        const otp = generateOTP();
        await sendOTPEmail(emailAdmin, emailPass, email, otp);
        res.status(200).send({ message: "OTP sent successfully", otp });
    } catch (error) {
        console.error('Error in /sendOTP route:', error.message);
        res.status(500).send("Failed to send OTP");
    }
});

export default route;
