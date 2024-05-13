import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{
    const token = req.cookie.accessToken;
    if(!token){
        res.status(401).json({success:false,message:"You're not authorize"})
    }
    jwt.verify(token,process.env.JWT_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(401).json({success:false,message:"token is invalid"})
        }
        req.user = user;
        next();
    })
}
export const verifyUser = async(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id||req.user.role === "admin"){
            return res.status(401).json({success:false,message:"You're not authenticated"})
        }
    })
}
export const verifyAdmin = async(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role === "admin"){
            next();
        }else{
            return res.status(401).json({success:false,message:"You're not authenticated"})
        }
    })
}