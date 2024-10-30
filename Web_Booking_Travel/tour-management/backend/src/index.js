import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import tourRoute from './routes/tours.js';
import userRoute from './routes/user.js';
import reviewsRoute from './routes/reviews.js';
import authRoute from './routes/auth.js';
import bookingRoute from './routes/booking.js';
import reviewProductRoute from './routes/reviewproduct.js';
import paymentMethodMOMO from './routes/paymentMethodMOMO.js';
import paymentMethodPayPal from './routes/paymentMethodPayPal.js';
import sendMail from './routes/SMTPAPIMail.js';
import bodyParser from 'body-parser';

// import './config/passport.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
console.log(port);

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};

mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Success');
    } catch (error) {
        console.log('Connect Mongo DB failed');
        console.log(error);
    }
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); 
app.use(cookieParser());
app.use(session({
    secret: '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',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/reviews', reviewsRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/user', userRoute);
app.use('', paymentMethodPayPal);
app.use('', paymentMethodMOMO);
app.use('/api/v1/reviewproduct', reviewProductRoute);
app.use('', sendMail);

app.listen(port, () => {
    connect();
    console.log('Server listening on port:', port);
});
