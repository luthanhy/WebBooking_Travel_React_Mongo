import Booking from '../models/Booking.js';

export const CreateBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const createBooking = await newBooking.save();
    res.status(200).json({ success: true, message: 'Create Booking Success', data: createBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Create Booking failed' });
  }
};

export const GetSingleBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const getSingleBooking = await Booking.findById(id);
    res.status(200).json({ success: true, message: 'Get Booking success', data: getSingleBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Get Booking Failed' });
  }
};
export const GetNotificationsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await Booking.find({ userId }).sort({ TimeBook: -1 });
    res.status(200).json({ success: true, message: 'Get Notifications by User ID Success', data: notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Get Notifications by User ID Failed' });
  }
};

export const GetByUserIdPayment = async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await Booking.find({ userId }).sort({ TimeBook: -1 });
    res.status(200).json({ success: true, message: 'Get Notifications by User ID Success', data: notifications[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Get Notifications by User ID Failed' });
  }
};
export const GetAllBooking = async (req, res) => {
  try {
    const getAllBooking = await Booking.find({});
    res.status(200).json({ success: true, message: 'Get All Booking Success', data: getAllBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Get All Booking Failed' });
  }
};

export const DeleteSingleBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteSingleBooking = await Booking.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Delete Single Booking Success', data: deleteSingleBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Delete Single Booking Failed' });
  }
};
export const UpdateSingleBooking = async (req, res) => {
  const id = req.params.id;
  try{
    const updateBooking  =  await Booking.findByIdAndUpdate(id,{
      $set:req.body,
    },{new:true});
    res.status(200).json({ success:"Update success " , data: updateBooking });
  }catch(error){
    res.status(404).json({ success:"Update failed " });
  }
}