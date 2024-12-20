import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  isGuest: {
    type: Boolean,
    default: false,
  },

  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // use to tell mongoose that elements inside of boards array will ref to other MOdels
      ref: "Board",
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
