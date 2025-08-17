import orderModel from "../models/orderModels.js";
import sendEmail from "../utilis/sendEmail.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";

// Get All Orders (Admin)

const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Get Orders for Authenticated User

const userOrders = async (req, res) => {
  try {
    let orders;
    if (req.isAdmin) {
      // Admin: get all orders
      orders = await orderModel.find({});
    } else {
      // Regular user: get orders for this userId
      orders = await orderModel.find({ userId: req.userId });
    }
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Place Order with Payfast

const placeOrderPayfast = async (req, res) => {
  try {
    const userId = req.userId; // <-- Get from auth middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    // Generate invoice number
    const orderCount = await orderModel.countDocuments();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(orderCount + 1)
      .toString()
      .padStart(5, "5")}`;

    // Save order in DB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      invoiceNumber,
      paymentMethod: "Payfast",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    await sendEmail(
      address.email,
      "🛒 Order Received - Thank you!",
      `<p>Hi ${address.firstName},</p>
     <p>We’ve received your order <strong>${invoiceNumber}</strong>. We’ll notify you once it ships.</p>
     <p>Thank you for shopping with us!</p>`
    );

    // Payfast Config
    const merchant_id = process.env.PAYFAST_MERCHANT_ID;
    const merchant_key = process.env.PAYFAST_MERCHANT_KEY;
    const return_url = `${origin}/verify?success=true&orderId=${newOrder._id}`;
    const cancel_url = `${origin}/verify?success=false&orderId=${newOrder._id}`;
    const notify_url = `${origin}/api/order/payfast/notify`; // Optional IPN

    const paymentData = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      amount: amount.toFixed(2),
      item_name: `Order ${invoiceNumber}`,
      name_first: address.firstName,
      name_last: address.lastName,
      email_address: address.email,
      m_payment_id: newOrder._id.toString(),
    };

    // Generate signature string
    const sortedKeys = Object.keys(paymentData).sort();
    const signatureString = sortedKeys
      .map(
        (key) =>
          `${key}=${encodeURIComponent(paymentData[key]).replace(/%20/g, "+")}`
      )
      .join("&");

    const signature = crypto
      .createHash("md5")
      .update(signatureString)
      .digest("hex");

    const payment_url = `https://www.payfast.co.za/eng/process?${signatureString}&signature=${signature}`;

    res.json({ success: true, payment_url });
  } catch (error) {
    console.error("Payfast order error:", error);
    res.json({ success: false, message: error.message });
  }
};


// Verify Payment (Used by frontend redirect)

const verifyPayment = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status (Admin)

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Update order and get the updated document
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Get the user
    const user = await userModel.findById(order.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Send email
    const emailBody = `
      <p>Hi ${user.name || "there"},</p>
      <p>Your order <strong>${order.invoiceNumber}</strong> has been updated to:</p>
      <h3>${status}</h3>
      <p>We’ll notify you again when it progresses further.</p>
    `;

    await sendEmail(
      user.email,
      `📦 Order Update - ${status}`,
      emailBody
    );

    res.json({ success: true, message: "Status updated and email sent" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete Order

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }

    const deleted = await orderModel.findByIdAndDelete(orderId);

    if (!deleted) {
      return res.json({
        success: false,
        message: "Order not found or already deleted",
      });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log("Delete Order Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  allOrder,
  userOrders,
  placeOrderPayfast,
  verifyPayment,
  updateStatus,
  deleteOrder,
};
