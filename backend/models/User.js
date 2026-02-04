import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },

    image: {
      data: Buffer,
      contentType: String,
    }, // store image path or cloud URL
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
