const product = require("../Models/Product_Schema");
const User = require("../Models/User_Schema");

const AddAddressNphone = async (req, res) => {
  try {
    const { address, phone } = req.body;
    const userId = req.user._id;
    if (!address || !address.city) {
      return res.status(400).json({ message: "City is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address, phone },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update address: " + err.message });
  }
};

const DisplayAllItems = async (req, res) => {
  const data = req.query;
  const page = data?.page || 1;
  const limit = data?.limit || 10;
  const category = data?.category || "";
  const skip = (page - 1) * limit;
  try {
    if (!category) {
      const items = await product.find().skip(skip).limit(limit);
      return res.json(items);
    }
    const items = await product.find({ category }).skip(skip).limit(limit);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const UpdateUserDetails = async (req, res) => {
  const { id, newdetails } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, newdetails, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update user details: " + err.message });
  }
};

const GetOneItem = async (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(404).json({ message: "Item not found" });
  }
  try {
    const item = await product.findById(id).populate({
      path: "seller",
      select: "SellerDetails.BussinessCity SellerDetails.BussinessName",
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addtoCart = async (req, res) => {
  try {
    const { id, qty } = req.body;
    const userid = req.user._id;

    const user = await User.findOne({ _id: userid, "Cart.Item": id });

    let response;

    if (user) {
      response = await User.findOneAndUpdate(
        { _id: userid, "Cart.Item": id },
        { $set: { "Cart.$.quantity": qty } },
        { new: true }
      ).select("-password");
    } else {
      response = await User.findByIdAndUpdate(
        userid,
        { $push: { Cart: { Item: id, quantity: qty } } },
        { new: true }
      ).select("-password");
    }

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const removefromCart = async (req, res) => {
  try {
    const { id } = req.body;
    const userid = req.user._id;

    const response = await User.findOneAndUpdate(
      { _id: userid },
      { $pull: { Cart: { Item: id } } },
      { new: true }
    ).select("-password");

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addtoLiked = async (req, res) => {
  try {
    const { id } = req.body;
    const userid = req.user._id;

    let response = await User.findByIdAndUpdate(
      userid,
      { $push: { likedItems: id } },
      { new: true }
    ).select("-password");

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const removefromLiked = async (req, res) => {
  try {
    const { id } = req.body;
    const userid = req.user._id;

    let response = await User.findByIdAndUpdate(
      userid,
      { $pull: { likedItems: id } },
      { new: true }
    ).select("-password");

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  const userId = req.user._id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete account: " + err.message });
  }
};

module.exports = {
  AddAddressNphone,
  DisplayAllItems,
  GetOneItem,
  UpdateUserDetails,
  addtoCart,
  removefromCart,
  addtoLiked,
  removefromLiked,
  deleteAccount,
};
