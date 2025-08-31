const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User_Schema");

const AdminKey = process.env.AdminKey;
const NormalKey = process.env.NormalKey;



const getsessionID = (user) => {
  return jwt.sign(user, NormalKey, {
    expiresIn: "30m",
  });
};
const getAdminSessionID = (user) => {
  return jwt.sign(user, AdminKey, {
    expiresIn: "1h",
  });
};

const verifysessionID = async (token) => {
  if (!token) return null;

  try {
    const data = jwt.verify(token, NormalKey);
    const id = data._id;
    const user = await User.findOne({ _id: id }).lean();
    delete user.password;
    return user;
  } catch {}

  try {
    const data = jwt.verify(token, AdminKey);
    const id = data._id;
    const user = await User.findOne({ _id: id }).lean();
    delete user.password;
    return user;
  } catch (err) {
    console.error("Something went wrong: " + err.message);
    return null;
  }
};

module.exports = { verifysessionID,getAdminSessionID,getsessionID };
