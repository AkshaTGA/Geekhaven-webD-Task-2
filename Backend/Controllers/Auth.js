const User = require("../Models/User_Schema");
const bcrypt = require("bcrypt");
const { verifysessionID, getsessionID } = require("./jwt.js");

const handleSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
    role: "buyer",
  }).then(() => {
    return res.status(201).json({ message: "User registered successfully" });
  });
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const userObj = user.toObject();
  delete userObj.password;
  const token = getsessionID(userObj);
  res.cookie("SID", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 60 * 1000,
  });
  return res.status(200).json({ message: "Login successful", userObj });
};

const authcheck = (req, res, next) => {
  const token = req.cookies?.SID;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const data = verifysessionID(token);
  if (!data) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = data;
  next();
};

module.exports = { handleSignup, handleLogin, authcheck };
