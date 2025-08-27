const product = require("../Models/Product_Schema");
const User = require("../Models/User_Schema");

const ApplyForSeller = async (req, res) => {
  const { SellerDetails } = req.body;
  const userId = req.user._id;
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
  if (req.user.role !== "seller" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Only sellers can add items" });
  }
  const {
    Productname,
    price,
    description,
    Stock,
    category,
    images,
    CurrentlyAvailable,
  } = req.body;

  if (
    !Productname ||
    !price ||
    !description ||
    !Stock ||
    !category ||
    !images ||
    CurrentlyAvailable === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const UserID = req.user._id;
  try {
    const newItem = await product.create({
      seller: UserID,
      Productname,
      price,
      description,
      Stock,
      category,
      images,
      CurrentlyAvailable,
    });
    const resp = await User.findOneAndUpdate(
      { _id: UserID },
      { $push: { "SellerDetails.YourItems": newItem._id } },
      { new: true }
    ).select("-password");

    res.status(201).json({ Status: "Success", updated: resp });
  } catch (err) {
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
    const deletedItem = await product.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const resp = await User.findOneAndUpdate(
      { _id: UserID },
      { $pull: { "SellerDetails.YourItems": id } },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Item removed successfully", updated: resp });
  } catch (err) {
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
    res.status(200).json({ message: "Item updated successfully", updated: updatedItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to update item: " + err.message });
  }
};

module.exports = { ApplyForSeller, AddItem, removeItem, EditItems };
