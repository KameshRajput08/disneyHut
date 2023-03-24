import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    likedMovies: Array
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema)
