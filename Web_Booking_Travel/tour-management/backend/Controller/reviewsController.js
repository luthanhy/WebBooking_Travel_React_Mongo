import Tour  from '../models/Tour.js'
import Review from '../models/Review.js'

export const CreateReviewTour = async(req,res) => {
    const id  = req.params.id;
    const newReview = new Review({...req.body})
    
    try {
        console.log("Creating new review...");
        const saveReview = await newReview.save()
        await Tour.findByIdAndUpdate(id,{
            $push:{reviews: saveReview._id}
        })
        console.log("Tour updated successfully");
        res.status(200).json({success:true , message:'Review Submitted',data:saveReview});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed Submit"})
    }
}
export const GetReviewTour = async(req,res) => {
    const TourId  = req.params.TourId;
}