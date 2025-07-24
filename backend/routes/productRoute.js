import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  editProduct,
} from "../controllers/productControllers.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const productRouter = express.Router();

// Add new product (protected by authUser)
productRouter.post(
  "/add",
  authUser,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Edit existing product (protected by adminAuth)
productRouter.put(
  "/edit",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  editProduct
);

// Get list of all products
productRouter.get("/list", listProduct);

// Remove a product by ID
productRouter.post("/remove", adminAuth, removeProduct);

// Get single product details
productRouter.get("/single", singleProduct);

// Update product general info
productRouter.put("/update", adminAuth, updateProduct);

export default productRouter;
