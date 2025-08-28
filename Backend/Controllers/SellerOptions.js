const product = require("../Models/Product_Schema");
const User = require("../Models/User_Schema");
const v2 = require("../Cloudinary/CloudinaryConfig");
const { Result } = require("postcss");
const ApplyForSeller = async (req, res) => {
  const { SellerDetails } = req.body;
  const userId = req.user?._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { role: "seller", SellerDetails },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update seller details: " + err.message });
  }
};

const AddItem = async (req, res) => {



  const {
    Productname,
    price,
    description,
    Stock,
    category,
    ProductCondition,
    CurrentlyAvailable,
    monthsUsed,
  } = req.body;

  if (req.user.role !== "seller" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only sellers can add items" });
  }

  let photos = req.files.photo;




  if (
    !Productname ||
    !price ||
    !description ||
    !Stock ||
    !category ||
    !photos ||
    !ProductCondition ||
    CurrentlyAvailable === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const UserID = req.user._id;
  let results;
  try {

        if (!Array.isArray(photos)) {
    photos = [photos];
  }

  const uploads = photos.map((file) =>
    v2.uploader.upload(file.tempFilePath)
  );

  results = await Promise.all(uploads);
  const photoslinks = results.map((result) => result.secure_url);

    let newItem;
    if (ProductCondition != "Used") {
      newItem = await product.create({
        seller: UserID,
        Productname,
        price,
        description,
        ProductCondition,
        Stock,
        category,
        images:photoslinks,
        CurrentlyAvailable,
      });
    } else {
      newItem = await product.create({
        seller: UserID,
        Productname,
        price,
        description,
        ProductCondition,
        monthsUsed: monthsUsed || 0,
        Stock,
        category,
        images:photoslinks,
        CurrentlyAvailable,
      });
    }
    const resp = await User.findOneAndUpdate(
      { _id: UserID },
      { $push: { "SellerDetails.YourItems": newItem._id } },
      { new: true }
    ).select("-password");

    res.status(201).json({ Status: "Success", updated: resp });
  } catch (err) {
    for (const result of results) {
      v2.uploader.destroy(result.public_id);
    }

    res.status(500).json({ error: "Failed to add item: " + err.message });
  }
};

const removeItem = async (req, res) => {
  if (req.user.role !== "seller" && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only sellers and admins can remove items" });
  }
  const UserID = req.user._id;
  const { id } = req.body;
  try {
    const images = await product.findById(id).select("images");
    const deletedItem = await product.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const resp = await User.findOneAndUpdate(
      { _id: UserID },
      { $pull: { "SellerDetails.YourItems": id } },
      { new: true }
    ).select("-password");

    for (const imgUrl of images.images) {
      const publicurl=imgUrl.split("/")[7].split(".")[0];
      v2.uploader.destroy(publicurl);
    }

    res
      .status(200)
      .json({ message: "Item removed successfully", updated: resp });
  } catch (err) {

    v2.uploader.destroy(deletedItem.public_id);
    res.status(500).json({ error: "Failed to remove item: " + err.message });
  }
};

const EditItems = async (req, res) => {
  if (req.user.role !== "seller" && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only sellers and admins can remove items" });
  }
  const { id, newdetails } = req.body;
  try {
    const updatedItem = await product.findByIdAndUpdate(id, newdetails, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Item updated successfully", updated: updatedItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to update item: " + err.message });
  }
};

module.exports = { ApplyForSeller, AddItem, removeItem, EditItems };
