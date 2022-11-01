import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import user from "../models/user.js";

const createUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const foundUser = await user.findOne({username})
		if (foundUser) {
			console.log(foundUser)
			return res.status(400).json({message: "User with this Username already exists"})
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await user.create({
			email: email,
			username: username,
			password: hashPassword,
		});
		const payload = {
			id: newUser._id,
			email: newUser.email,
			username: newUser.username
		}
		const token = jwt.sign(payload, process.env.SECRET, {expiresIn: 3600})
		return res.status(201).json({ message: "New User Created", token });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await user.findOne({ email });
		if (!foundUser) {
			return res.status(404).json({ message: "Invalid Email Address" });
		}
		const match = await bcrypt.compare(password, foundUser.password);
		if (!match) {
			return res.status(404).json({ message: "Invalid password" });
		}
		const payload = {
			id: foundUser._id,
			email: foundUser.email,
			username: foundUser.username,
		};
		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: 3600,
		});
		return res.status(200).json({ message: "Successfully Logged In", token });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};


export default { createUser, loginUser};
