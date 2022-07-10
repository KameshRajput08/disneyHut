import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  fetchLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies
} from "../controllers/auth.js";
import verify from "../middlewares/verify.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", verify, updateUser);
router.delete("/:id", verify, deleteUser);
router.get("/find/:id", verify, getUser);
router.get("/getAll", verify, getAllUsers);
router.get("/likedMovies/:email", fetchLikedMovies);
router.post("/add/movie", addToLikedMovies);
router.put("/remove/movie", removeFromLikedMovies)

export default router;




