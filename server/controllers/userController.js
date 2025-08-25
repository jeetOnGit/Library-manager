import userModel from "../models/user.js";
import bookModel from "../models/Book.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const JWT_SECRET = process.env.JWT_SECRET;

// Register user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be 8 characters",
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
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
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
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

    // prevent duplicates
    if (user.favourites.includes(bookId)) {
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

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const book = await bookModel.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // check if already borrowed
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyBorrowed = user.borrowedBooks.some(
      (b) => b.book.toString() === bookId
    );

    if (alreadyBorrowed) {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    // push book into user's borrowedBooks
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        borrowedBooks: {
          book: bookId,
          borrowedAt: new Date(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    // update book (decrease copy)
    await bookModel.findByIdAndUpdate(bookId, {
      $inc: { availableCopies: -1 },
    });

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Return a book
const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const borrowed = user.borrowedBooks.find(
      (b) => b.book.toString() === bookId.toString()
    );
    if (!borrowed) {
      return res.status(400).json({ message: "Book was not borrowed" });
    }

    // remove from borrowedBooks by matching `book`
    await userModel.findByIdAndUpdate(userId, {
      $pull: { borrowedBooks: { book: bookId } },
    });

    // increase book availableCopies
    await bookModel.findByIdAndUpdate(bookId, {
      $inc: { availableCopies: 1 },
    });

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get user's profile
const getMyProfile = async(req, res) => {
  try {
    const user = await userModel
    .findById(req.userId)
    .populate("favourites")
    .populate("borrowedBooks.book")

    if(!user){
      res.status(400).json({success: false, message: "User not found"})
    }

    res.json({
      success:true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        favourites: user.favourites,
        borrowedBooks: user.borrowedBooks
      }
    });

  } catch (err) {
     res.status(500).json({ error: err.message });
  }
}

export {
  registerUser,
  loginUser,
  getAllUsers,
  addFavBooks,
  getFavBooks,
  removeFavBook,
  borrowBook,
  returnBook,
  getMyProfile
};
