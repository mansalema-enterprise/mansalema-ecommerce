import express from "express";
import authUser from "../middleware/auth.js";
import {
  allOrder,
  userOrders,
  placeOrderPayfast,
  verifyPayment,
  updateStatus,
  deleteOrder,
} from "../controllers/orderControllers.js";

const orderRouter = express.Router();

// Admin route - no auth here but you can add admin middleware
orderRouter.get("/all", allOrder);

// User routes - protected by auth middleware
orderRouter.post("/list", authUser, userOrders);
orderRouter.post("/payfast", authUser, placeOrderPayfast);
orderRouter.post("/verify", verifyPayment); // Usually no auth needed
orderRouter.post("/status", authUser, updateStatus);
orderRouter.post("/delete", authUser, deleteOrder);

export default orderRouter;
