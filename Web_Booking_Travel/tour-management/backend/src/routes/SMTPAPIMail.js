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
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
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

// Route to send booking email
route.post('/sendBookingMail', async (req, res) => {
    const { recipient, bookingInfo } = req.body;

    try {
        await SMTPSendMail(emailAdmin, emailPass, recipient, bookingInfo);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

export default route;
