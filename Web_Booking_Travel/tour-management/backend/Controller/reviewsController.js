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

export const DeleteReviewTour = async (req, res) => {
    const reviewId = req.params.id; 
    const tourId = req.params.tourId;  

    try {
       
        const deletedReview = await Review.findOneAndDelete({ _id: reviewId });

        if (!deletedReview) {
            return res.status(404).json({ success: false, message: `Review not found` });
        }

    
        await Tour.findByIdAndUpdate(tourId, {
            $pull: { reviews: reviewId }
        });

        res.status(200).json({ success: true, message: `Review deleted successfully` });
    } catch (error) {
        res.status(500).json({ success: false, message: `Failed to delete review` });
    }
}
export const GetReviewTour = async (req, res) => {
    const reviewID = req.params.id;
    try {
      const tour = await Tour.findById(reviewID).populate('reviews');
      res.status(200).json({ success: true, data: tour.reviews });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
}