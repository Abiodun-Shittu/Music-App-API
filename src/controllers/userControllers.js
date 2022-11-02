import bcrypt from "bcrypt";
import createToken from "../services/jwt.js";
import user from "../models/user.js";

const createUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const checkMail = await user.findOne({ email });
		const foundUser = await user.findOne({ username });
		if (checkMail) {
			return res
				.status(400)
				.json({ message: "User with this Email already exists" });
		}
		if (foundUser) {
			return res
				.status(400)
				.json({ message: "User with this Username already exists" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await user.create({
			email: email,
			username: username,
			password: hashPassword,
		});
		const token = createToken(newUser);
		return res.status(201).json({ message: "New User Created", token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
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
		const token = createToken(foundUser);
		return res
			.status(200)
			.json({ message: "Successfully Logged In", token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

export default { createUser, loginUser };
