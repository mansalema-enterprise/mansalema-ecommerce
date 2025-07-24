import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

console.log("userRouter.js loaded");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

userRouter.get('/test', (req, res) => {
  res.json({ message: "User router is working" });
});

export default userRouter;
