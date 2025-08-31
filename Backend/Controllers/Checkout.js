const Transaction = require("../Models/Transaction_Schema");
const User = require("../Models/User_Schema");
const { seed,n } = require("../utils/seed");
const crypto=require("crypto")




const getPriceBreakup = async (req, res) => {
  const cart = await User.findById(req.user._id)
    .select("Cart")
    .populate("Cart.Item");

  const subtotal = cart.Cart.reduce((acc, item) => {
    const itemPrice = item.Item.price * item.quantity;
    return acc + itemPrice;
  }, 0);

  const platformFee = Math.floor(0.017 * subtotal + n);
  return res.json({ subtotal, platformFee });
};

const checkout = async (req, res) => {
  try {
    const userId = req.user._id;
    const { paymentMethod, idempotencyKey } = req.body;

    if (!paymentMethod || !idempotencyKey) {
      return res
        .status(400)
        .json({ message: "Payment method and idempotency key required" });
    }

    const existingtrans = await Transaction.find({
      idempotencyKey,
      buyer: userId,
    });
    if (existingtrans.length > 0) {
      return res.json({
        message: "Transaction already processed",
        transactions: existingtrans,
      });
    }

    const user = await User.findById(userId).populate("Cart.Item");
    if (!user || user.Cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const sellergroups = {};
    user.Cart.forEach((cartItem) => {
      const sellerId = cartItem.Item.seller.toString();
      if (!sellergroups[sellerId]) {
        sellergroups[sellerId] = [];
      }
      sellergroups[sellerId].push({
        itemId: cartItem.Item._id,
        quantity: cartItem.quantity,
        price: cartItem.Item.price,
      });
    });
    let transactions = [];
    for (const sellerId in sellergroups) {
      const sellerItems = sellergroups[sellerId];
      let amount = 0;
      sellerItems.forEach((i) => (amount += i.price * i.quantity));

      const newtrans = await Transaction.create({
        idempotencyKey,
        buyer: userId,
        seller: sellerId,
        items: sellerItems.map((i) => ({
          itemId: i.itemId,
          quantity: i.quantity,
        })),
        amount,
        paymentMethod,
        status: "sucess",
      });

      transactions = [...transactions, newtrans];

      await User.findByIdAndUpdate(userId, {
        $push: { YourTransactions: newtrans._id },
      });

      await User.findByIdAndUpdate(sellerId, {
        $push: { OrdersRecieved: newtrans._id },
      });
    }
    await User.findByIdAndUpdate(userId, { $set: { Cart: [] } });

    const responsebody = {
      message: "Checkout successful",
      transactions,
    };

    const hmac = crypto
      .createHmac("sha256", seed)
      .update(JSON.stringify(responsebody))
      .digest("hex");

    res.set("X-Signature", hmac);

    return res.json({ ...responsebody });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { checkout, getPriceBreakup };
