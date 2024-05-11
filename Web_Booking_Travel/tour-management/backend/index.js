import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

//connect databases

const connect = async() =>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}

app.get("/",(req,res)=>{
    res.send("api is working");
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(port,()=>{
    console.log('server listen port : ',port)
})

