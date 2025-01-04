import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cards: [cardSchema], 
});

const boardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", 
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lists: [listSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Board || mongoose.model("Board", boardSchema);
