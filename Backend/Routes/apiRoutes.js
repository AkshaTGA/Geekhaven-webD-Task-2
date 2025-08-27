const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();
const { handleSignup, handleLogin, authcheck } = require("../Controllers/Auth");
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
} = require("../Controllers/AllUserfunctions");

router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.get("/hi", (req, res) => {
  res.send("hi");
});

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.put("/partner/apply", authcheck, ApplyForSeller);

router.put("/address", authcheck, AddAddressNphone);

router.get("/products", DisplayAllItems);

router.get("/item/:id", GetOneItem);

router.put("/user/update", UpdateUserDetails);

router.post("/partner/additem", authcheck, AddItem);

router.delete("/partner/removeitem", authcheck, removeItem);

router.put("/partner/edititem", authcheck, EditItems);

router.put("/addtocart", authcheck, addtoCart);
router.put("/removefromcart", authcheck, removefromCart);

module.exports = router;
