import Tour  from '../models/Tour.js'
import Review from '../models/Review.js'

export const CreateReviewTour = async(req,res) => {
    const TourId  = req.params.TourId;
    const newReview = new Review({...req.body})
    
    try {
        console.log(newReview);
        const saveReview = await newReview.save()
        console.log("jj");
        console(saveReview)
        await Tour.findByIdAndUpdate(TourId,{
            $push:{reviews : saveReview._id}
        })

        res.status(200).json({success:true , message:'Review Submitted',data:saveReview});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed Submit"})
    }
}
export const GetReviewTour = async(req,res) => {
    const TourId  = req.params.TourId;
}