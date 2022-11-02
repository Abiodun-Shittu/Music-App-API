import express from "express";
import musicControllers from "../controllers/musicControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth.authUser, auth.checkRole, musicControllers.createMusic);
router.get("/", auth.authUser, musicControllers.getAllMusic);
router.get("/:id", auth.authUser, musicControllers.getSingleMusic);
router.patch(
	"/:id",
	auth.authUser,
	auth.checkRole,
	musicControllers.updateMusic
);
router.delete(
	"/:id",
	auth.authUser,
	auth.checkRole,
	musicControllers.deleteMusic
);

export default router;
