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
// export const ApprovePayment = async (req, res) => {
//     const { orderId } = req.body;
//     try {
//         const booking = await Booking.findById(orderId);
//         if (!booking) {
//             return res.status(404).json({ success: false, message: 'Booking not found' });
//         }

//         if (!booking.Status_Transaction) {
//             // Gửi email thông báo đến khách hàng
//             await sendEmail(
//                 booking.userEmail,
//                 'Payment Approved',
//                 `Dear ${booking.fullName}, your payment for the tour ${booking.tourName} has been approved.`
//             );
            
//             // Cập nhật trạng thái thanh toán
//             booking.Status_Transaction = true;
//             await booking.save();
            
//             res.status(200).json({ success: true, message: 'Payment approved successfully and email sent', data: booking });
//         } else {
//             res.status(400).json({ success: false, message: 'Booking already paid' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: 'Failed to approve payment' });
//     }
// }

