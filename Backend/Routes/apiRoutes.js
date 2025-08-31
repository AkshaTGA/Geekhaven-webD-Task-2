const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();
const fileupload = require("express-fileupload");
const { handleSignup, handleLogin, authcheck, checkauth } = require("../Controllers/Auth");
const {
  ApplyForSeller,
  AddItem,
  removeItem,
  EditItems,
} = require("../Controllers/SellerOptions");
const {
  AddAddressNphone,
  DisplayAllItems,
  GetOneItem,
  UpdateUserDetails,
  addtoCart,
  removefromCart,
  removefromLiked,
  addtoLiked,
  deleteAccount,
} = require("../Controllers/AllUserfunctions");

const {checkout, getPriceBreakup} = require("../Controllers/Checkout");

router.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
    exposedHeaders: ["X-Signature"],
  })
);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(fileupload({ useTempFiles: true }));

router.get("/hi", (req, res) => {
  res.send("hi");
});

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.put("/partner/apply", authcheck, ApplyForSeller);

router.put("/address", authcheck, AddAddressNphone);

router.get("/products", DisplayAllItems);

router.get("/item/:id", GetOneItem);

router.put("/update", UpdateUserDetails);

router.post("/partner/additem",authcheck, AddItem);

router.delete("/partner/removeitem", authcheck, removeItem);

router.put("/partner/edititem", authcheck, EditItems);

router.put("/addtocart", authcheck, addtoCart);

router.put("/addtoliked", authcheck, addtoLiked);

router.put("/removefromcart", authcheck, removefromCart);

router.put("/removefromliked", authcheck, removefromLiked);

router.delete("/delete", authcheck, deleteAccount);

router.get("/priceBreakup", authcheck, getPriceBreakup);

router.post("/checkout", authcheck, checkout);

router.get("/auth/checkauth", checkauth);

router.post("/logout", (req, res) => {
  res.clearCookie("SID", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
