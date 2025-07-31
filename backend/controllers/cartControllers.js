import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    // ✅ No message returned, only success
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    quantity > 0 ? (cartData[itemId] = quantity) : delete cartData[itemId];

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData)
      return res.json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    userData.cartData = {};
    await userData.save();

    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart, clearCart };
