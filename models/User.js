const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);