import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cccd:{
      type:Number,
      require:true,
      unique:true,
    },
    phoneNumber:{
      type:Number,
      require:true,
      unique:true,
    },
    password: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ["user", "sale"],
      default: "user",
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
