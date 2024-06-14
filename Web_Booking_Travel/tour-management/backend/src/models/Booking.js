import mongoose, { Types } from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref: "user"
        },
        userEmail:{
            type:String,
        },
        tourName:{
            type:String,
            required:true
        },
        fullName:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        guestSize:{
            type:Number,
            required:true
        },
        BookAt:{
            type:Date,
            required:true
        },
        Status_Transaction:{
            type:Boolean,
            default: false,
        },
        MeThodPayment:{
            type:String,
            default:"",
        },
        orderId:{
            type:String
        },
        TimeBook:{
            type:Date,
            required:true
        },
    }
)
export default  mongoose.model("Booking", bookingSchema);