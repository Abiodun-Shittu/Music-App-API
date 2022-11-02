import express from "express";
import musicControllers from "../controllers/musicControllers.js";

const router = express.Router();

router.post("/", musicControllers.createMusic);
router.get("/", musicControllers.getAllMusic);
router.get("/:id", musicControllers.getSingleMusic);
router.patch("/:id", musicControllers.updateMusic);
router.delete("/:id", musicControllers.deleteMusic);

export default router;
