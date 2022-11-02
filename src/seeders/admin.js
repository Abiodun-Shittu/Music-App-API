import bcrypt from "bcrypt";
import dotenv from "dotenv";
import user from "../models/user.js";

dotenv.config();

const seedAdmin = async () => {
	try {
		const findUser = await user.findOne({ role: "admin" });
		if (findUser) {
			console.log("An Admin already exists");
			return null;
		}
		const hashed = await bcrypt.hash(process.env.PASSWORD, 10);
		const admin = await user.create({
			email: process.env.EMAIL,
			username: process.env.USERNAME,
			password: hashed,
			role: "admin",
		});
		console.log("Admin Created");
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default seedAdmin;
