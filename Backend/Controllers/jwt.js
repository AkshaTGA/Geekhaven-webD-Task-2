const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../Models/User_Schema");




const secretKey = process.env.secretKey;
const getsessionID = (user) => {
  return jwt.sign(user, secretKey,{
  expiresIn: "30m"
})
};

const verifysessionID =async  (token) => {
  if (!token) return null;

  try {
    const data= jwt.verify(token, secretKey);
    const id=data._id;
    const user  = await User.findOne({_id:id}).lean();
    delete user.password;
    return user;
  } catch (err) {
    console.error("Something went wrong: " + err.message);
    return null;
  }
};

module.exports = { verifysessionID, getsessionID };