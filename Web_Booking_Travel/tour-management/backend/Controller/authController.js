import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const Register = async(req,res)=>{
    //hash password
    const salt =await bcrypt.genSalt(10)
    const hashPass = bcrypt.hashSync(req.body.password,salt)

    try{
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPass,
            photo : req.body.photo
        })
        await newUser.save();

        res.status(200).json({success:true,message:"Register user success",data:newUser})
    }catch(err){
        res.status(401).json({success:false,message:"Register failed"})
    }
}
export const Login = async(req,res)=>{
    const email = req.body.email;
    try{
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            res.status(401).json({success:false,message:"email not found"})
        }
        if (!user.password) {
            return res.status(401).json({ success: false, message: "User password is missing" });
        }
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        console.log("lol")
        if(!checkCorrectPassword){
            return res.status(200).json({success:true,message:"Incorrect Email or Password"})
        }
        const {password,role,...rest} = user._doc;

        //create token verify

        const token =  jwt.sign({id:user._id,role:user._role},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})

        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,message:"Login success",data:{...rest}});
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Login failed"});
    }
}