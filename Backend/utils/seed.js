const crypto = require("crypto");
const seed = "GHW25-077";

const n = Number(seed.split("-")[1]);

const getSku = (productname) => {
  const checksum = crypto
    .createHash("md5")
    .update(productname + seed)
    .digest("hex")
    .substring(0, 6);

  return `SKU-${checksum}-${Date.now().toString().substring(10, 15)}`;
};

module.exports = { getSku, n ,seed};
