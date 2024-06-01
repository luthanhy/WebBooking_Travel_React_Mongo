import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/user.js';
import reviewsRoute from './routes/reviews.js';
import authRoute from './routes/auth.js';
import bookingRoute from './routes/booking.js';
import reviewProductRoute from './routes/reviewproduct.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};

// Connect to MongoDB
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

app.get('/', (req, res) => {
    res.send('API is working');
});

app.use(express.json());
app.use(cors(corsOptions)); // Use the correct CORS options here
app.use(cookieParser());

app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/reviews',reviewsRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/reviewproduct', reviewProductRoute);
app.listen(port, () => {
    connect();
    console.log('Server listening on port:', port);
});
