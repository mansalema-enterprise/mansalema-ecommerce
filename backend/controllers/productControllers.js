import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModels.js";
import streamifier from "streamifier";

// Helper: Upload buffer to Cloudinary
const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

// ➕ Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, bestSeller } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, price, description, category) are required",
      });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await streamUpload(file.buffer);
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      bestSeller: bestSeller === "true" || bestSeller === true,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("🔥 addProduct error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📝 List All Products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("🔥 listProduct error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("🔥 removeProduct error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔍 Get Single Product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error("🔥 singleProduct error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Edit Product
const editProduct = async (req, res) => {
  try {
    const { productId, name, price, description, category, bestSeller } =
      req.body;

    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      bestSeller: bestSeller === "true" || bestSeller === true,
    };

    if (req.files) {
      const image1 = req.files?.image1?.[0];
      const image2 = req.files?.image2?.[0];
      const image3 = req.files?.image3?.[0];
      const image4 = req.files?.image4?.[0];

      const images = [image1, image2, image3, image4].filter(Boolean);

      const imagesUrl = await Promise.all(
        images.map(async (file) => {
          const result = await streamUpload(file.buffer);
          return result.secure_url;
        })
      );

      updateData.image = imagesUrl;
    }

    await productModel.findByIdAndUpdate(productId, updateData);
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("🔥 editProduct error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔄 Update Product (Direct update by ID)
const updateProduct = async (req, res) => {
  try {
    const { _id, name, price, category, description, image } = req.body;

    const updated = await productModel.findByIdAndUpdate(
      _id,
      { name, price, category, description, image },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated", product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  listProduct,
  removeProduct,
  singleProduct,
  editProduct,
  updateProduct,
};
