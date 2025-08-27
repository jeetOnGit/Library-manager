import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    favourites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book" // This ref must match your Book model name
    }],
    // Note: We do not store borrow requests here directly. We use a virtual field.
  },
  {
    timestamps: true,
    // IMPORTANT: These options are required for virtual fields to show up.
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ✨ THIS IS THE VIRTUAL FIELD THAT LINKS USERS TO THEIR BORROW REQUESTS
// This code does not create a new field in the database. It creates a virtual link.
userSchema.virtual('borrowRequests', {
  ref: 'Borrow',          // The model to link to (must match your Borrow model name)
  localField: '_id',      // The field on this model (User) to use for the link
  foreignField: 'user'    // The field on the other model (Borrow) to match against
});

const User = mongoose.model("User", userSchema);

export default User;