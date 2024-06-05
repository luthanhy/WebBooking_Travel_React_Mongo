import Booking from '../models/Booking.js'

export const CreateBooking = async(req,res) =>{
    const newBooking = new Booking(req.body);
    try {
        const createBooking = await newBooking.save()

        res.status(200).json({success:true,message:'Create Booking Success',data:createBooking})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'Create Booking failed'})
    }
}
export const GetSingleBooking = async(req,res) =>{
    const id = req.params.id;

    try {
        const getSingleBooking = await Booking.findById(id);
        res.status(200).json({success:true,message:'Get Booking success',data:getSingleBooking})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Get Booking Failed"})
    }
}
export const GetAllBooking = async(req,res) =>{
    const getAllBooking = await Booking.find({});
    try {

        res.status(200).json({success:true,message:'Get All Booking Success',data:getAllBooking})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Get All Booking Failed"})
    }
}
export const DeleteSingleBooking = async(req,res) =>{
    const id = req.params.id; 
    try{
        const deleteSingleBooking = await Booking.findByIdAndDelete(id);
        res.status(200).json({success:true,message:'Delete Single Booking Success',data:deleteSingleBooking})
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Delete Single Booking Failed"})
    }
}