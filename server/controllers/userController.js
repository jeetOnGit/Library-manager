import userModel from "../models/user.js";
import bookModel from "../models/Book.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import Borrow from "../models/BorrowedBooks.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(JWT_SECRET);
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    // check existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //validating hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credintials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// const addFavBooks = async (req, res) => {
//   try {
//     const { userId, bookId } = req.params;

//     const user = await userModel.findById(userId);
//     const book = await bookModel.findById(bookId);

//     if (!user || !book) {
//       return res.status(404).json({ message: "User or Book not found" });
//     }

//     // avoid duplicates
//     if (user.favourites.includes(bookId)) {
//       return res.status(400).json({ message: "Book already in favourites" });
//     }

//     user.favourites.push(bookId);
//     await user.save();
//     res.status(200).json({
//       message: "Book added to favourites",
//       favourites: user.favourites,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const addFavBooks = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    // check if user & book exist
    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or Book not found" });
    }

    if (user.favourites.some(fav => fav.toString() === bookId)) {
  return res.status(400).json({ message: "Book already in favourites" });
}


    // update only favourites
    await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favourites: bookId } },
      { new: true }
    );

    res.status(200).json({
      message: "Book added to favourites",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFavBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { favourites: bookId } }, // remove bookId from array
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Book removed from favourites",
      favourites: user.favourites,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFavBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).populate("favourites");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({
      success: true,
      favourites: user.favourites,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = req.user;

    // The crash is happening on one of the next two lines:
    await user.populate("favourites");
    await user.populate({
      path: "borrowRequests",
      match: { status: { $in: ["pending", "approved"] } },
      populate: {
        path: "book",
        model: "Book",
      },
    });

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware

    const myRequests = await Borrow.find({ user: userId })
      .populate("book", "title author coverImage")
      .sort({ createdAt: -1 });

    res.status(200).json(myRequests);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error fetching your requests",
        error: error.message,
      });
  }
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  addFavBooks,
  getFavBooks,
  removeFavBook,
  getMyProfile,
  getMyRequests,
};
