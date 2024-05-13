import User from "../models/User.js";

export const CreateNewUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Create User success",
      data: saveUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Create User fail" });
  }
};
export const UpdateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({success:true , message:"Update Users success",data:updateUser})
  } catch (err) {
    res
      .status(500)
      .json(
        { success: false, message: "Update User failed" }
      );
    console.log(err);
  }
};

export const GetSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleUser = await User.findById(id);
    res.status(200).json({success:true,message:`Find User success ${getSingleUser.title}`,data:getSingleUser});
  } catch (err) {
    res.status(404).json({success:true,message:`Find User failed `});
    console.log(err);
  }
};

export const GetAllUser = async (req,res)=>{
    const page = parseInt(req.query.page);
    console.log(page)
    try{
      const allUser = await User.find({}).skip(page*8).limit(8)
      res.status(200).json({success:true,count:allUser.length,message:"get all User success",allUser});
    }catch(err){
      res.status(404).json({success:true,message:"find found"})
    }
}
export const DeleteUser = async (req, res) => {
  const id = req.params.id
  try {
      const deleteUser = await User.findByIdAndDelete(id);
      res.status(200).json({success:true,message:`Delete User ${deleteUser.title} success`});
  } catch (err) {
      res.status(500).json({success:true,message:"Delete User failed"});
    console.log(err);
  }
};

export const GetUserBySearch = async(req,res) =>{
    const username  =  new RegExp(req.query.username,'i')
    try {

      const getUserBySearch = await User.find({username})//maxGroupSize:{$gte:maxGroupSize}
      console.log(getUserBySearch)
      res.status(200).json({success:true,message:'Search User Success',data:getUserBySearch})
    } catch (error) {
      res.status(404).json({success:false,message:'Search failed'})
    }
}
export const GetUserCount = async(req,res)=>{
    try {
        const countUser = await User.estimatedDocumentCount();
        res.status(200).json({success:true,message:'Count User success',data:countUser})
    } catch (error) {
        res.status(404).json({success:false,message:'Count User failed'})
    }
}

