import Tour from "../models/Tour";

export const CreateNewTour = async(req,res)=>{
    const newTour = new Tour(req.body)
    try{
        const saveTour = await newTour.save()

        res.status(200).json({success:true,message:"Create tour success",data:saveTour})
    }catch(err){
        res.status(500).json({success:false,message:"Create tour fail"})
    }   
}