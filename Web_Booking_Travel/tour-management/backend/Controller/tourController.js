import Tour from "../models/Tour.js";

export const CreateNewTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const saveTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Create tour success",
      data: saveTour,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Create tour fail" });
  }
};
export const UpdateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({success:true , message:"Update tours success",data:updateTour})
  } catch (err) {
    res
      .status(500)
      .json(
        { success: false, message: "Update tour failed" }
      );
    console.log(err);
  }
};

export const GetSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleTour = await Tour.findById(id).populate('reviews');
    res.status(200).json({success:true,message:`Find tour success ${getSingleTour.title}`,data:getSingleTour});
  } catch (err) {
    res.status(404).json({success:true,message:`Find tour failed `});
    console.log(err);
  }
};

export const GetAllTour = async (req,res)=>{
    const page = parseInt(req.query.page);
    console.log(page)
    try{
      const allTour = await Tour.find({}).populate('reviews').skip(page*8).limit(8)
      res.status(200).json({success:true,count:allTour.length,message:"get all tour success",data:allTour});
    }catch(err){
      res.status(404).json({success:true,message:"find found"})
    }
}
export const DeleteTour = async (req, res) => {
  const id = req.params.id
  try {
      const deleteTour = await Tour.findByIdAndDelete(id);
      res.status(200).json({success:true,message:`Delete tour ${deleteTour.title} success`});
  } catch (err) {
      res.status(500).json({success:true,message:"Delete tour failed"});
    console.log(err);
  }
};

export const GetTourBySearch = async(req,res) =>{
    const city = new RegExp(req.query.city,'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {

      const getTourBySearch = await Tour.find({city,distance:{$gte:distance}})//maxGroupSize:{$gte:maxGroupSize}
      console.log(getTourBySearch)
      res.status(200).json({success:true,message:'Search Tour Success',data:getTourBySearch})
    } catch (error) {
      res.status(404).json({success:false,message:'Search failed'})
    }
}
export const GetTourCount = async(req,res)=>{
    try {
        const countTour = await Tour.estimatedDocumentCount();
        res.status(200).json({success:true,message:'Count tour success',data:countTour})
    } catch (error) {
        res.status(404).json({success:false,message:'Count tour failed'})
    }
}
export const GetFeaturedTour = async(req,res)=>{
  try{
      const getFeatureTour = await Tour.find({featured:true});
      res.status(200).json({success:true,message:'Find Featured Tour Success',data:getFeatureTour})
  }catch(error){
      res.status(404).json({success:false,message:"find feature failed"})
  }
}
