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
  // Change 1: Rename this field to createdBy for consistency with your API
  createdBy: {
    // Change 2: Use String type to support both ObjectIds and string guest IDs
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lists: {
    // Change 3: Make lists optional with a default empty array
    type: [listSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Board || mongoose.model("Board", boardSchema);