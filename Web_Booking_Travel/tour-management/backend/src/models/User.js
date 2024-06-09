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
    cccd: {
      type: Number,
      unique: true,
      sparse: true, 
    },
    phoneNumber: {
      type: Number,
      unique: true,
      sparse: true, 
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

userSchema.pre('save', function(next) {
  if (this.accountType === 'sale') {
    if (!this.cccd || !this.phoneNumber) {
      return next(new Error('cccd and phoneNumber are required for sales account'));
    }
  } else {
    this.cccd = null;
    this.phoneNumber = null;
  }
  next();
});
export default mongoose.model("User", userSchema);
