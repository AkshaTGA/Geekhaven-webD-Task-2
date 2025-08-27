const jwt = require("jsonwebtoken");
require("dotenv").config()




const secretKey = process.env.secretKey;
const getsessionID = (user) => {
  const payload = user.toObject();
  console.log(payload)
  return jwt.sign(payload, secretKey,{
  expiresIn: "30m"
})
};

const verifysessionID = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.error("Something went wrong: " + err.message);
    return null;
  }
};

module.exports = { verifysessionID, getsessionID };