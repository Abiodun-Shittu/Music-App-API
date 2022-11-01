import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.loginUser);

export default router;
