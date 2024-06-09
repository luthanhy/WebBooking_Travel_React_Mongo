import NodeMailer from 'nodemailer';

export const SMTPSendMail = async (emailAdmin, emailPass, recipient, bookingInfo) => {
    try {
        let transporter = NodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailAdmin,
                pass: emailPass,
            },
        });

        let info = await transporter.sendMail({
            from: emailAdmin,
            to: recipient,
            subject: "Booking Confirmation",
            html: `<h1>Thank you for booking with us!</h1><p>Booking details:</p>
                   <p>Price: $</p><p>Book At: </p><p>Amount: </p>
                   <p>Tour Name: ${bookingInfo.tourName}</p><p>Full Name: ${bookingInfo.fullName}</p>
                   <p>Phone Number: ${bookingInfo.phoneNumber}</p><p>Transaction: ${bookingInfo.transactionId}</p>`,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};

export const sendOTPEmail = async (emailAdmin, emailPass, recipient, otp) => {
    try {
        let transporter = NodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailAdmin,
                pass: emailPass,
            },
        });

        let info = await transporter.sendMail({
            from: emailAdmin,
            to: recipient,
            subject: "Your OTP Code",
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        });

        console.log("OTP sent: %s", info.messageId);
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw error;
    }
};
