import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register a user
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPasssword = await bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashedPasssword,
    });
    if (newUser) {
      try {
        const savedUser = await newUser.save();
        res.status(200).json({
          user: savedUser,
          token: generate_jwt(newUser._id, newUser.isAdmin),
        });
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(400).json({ message: "Please fill all required fields." });
    }
  } else {
    res.status(400).json({ message: "User already exists." });
  }
};

const generate_jwt = (id, isAdmin) => {
  return jwt.sign({ id: id, isAdmin: isAdmin }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
};

//Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const comparePasssword = await bcrypt.compare(password, user.password);

    if (comparePasssword) {
      try {
        const { password, ...others } = user._doc;
        res
          .status(200)
          .json({ user: others, token: generate_jwt(user._id, user.isAdmin) });
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } else {
    res.status(404).json({ message: "User don't exist." });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//GET USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//GET ALL USERS
export const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ id: -1 }).limit(5)
      : User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// Fetching liked movies
export const fetchLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ movies: user.likedMovies });
    } else {
      res.status(200).json({ message: "User has no liked movies" });
    }
  } catch (err) {
    res.status(400).json({ message: "Erorr in fetching liked movies" });
  }
};

// Adding movie to the liked movies list
export const addToLikedMovies = async (req, res) => {
  try {
    const { email, mediaId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;

      //check if the movie is already liked
      const isMovieAlreadyLiked = await likedMovies.find(
        (id) => id === mediaId
      );

      if (!isMovieAlreadyLiked) {
        const updatedMovies = await User.findByIdAndUpdate(
          user._id,
          { $push: { likedMovies: req.body.movieData } },
          {
            new: true,
          }
        );
        res.status(200).json(updatedMovies);
      } else {
        res
          .status(409)
          .json({ message: "Movie is already added to the liked list" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

// Adding movie to the liked movies list
export const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    const updatedMovies = await User.findByIdAndUpdate(
      user._id,
      { $pull: { likedMovies: { id: movieId } } },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMovies);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
