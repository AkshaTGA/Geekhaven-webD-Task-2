const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
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
      enum: ["buyer", "seller", "both"],
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    phone: String,

    Cart: [
      {
        Item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: String, default: 1 },
      },
    ],
    likedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    YourTransactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
    SellerDetails: {
      BussinessName: String,
      BussinessCity: String,
      BankAccount: {
        Name: String,
        AccountNo: String,
        IFSC: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
