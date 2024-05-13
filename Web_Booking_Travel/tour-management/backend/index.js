import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/user.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

//connect databases
mongoose.set("strictQuery",false)
const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }) 
        console.log("Connect Success");
    } catch (error) {
        console.log("Connect Mongo DB failed");
        console.log(error);
    }
}

app.get("/",(req,res)=>{
    res.send("api is working");
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/tours",tourRoute)
app.use("/user",userRoute)

app.listen(port,()=>{
    connect();
    console.log('server listen port : ',port)
})

