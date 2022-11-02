import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./database/db.js";
import userRouter from "./routes/userRoutes.js";
import musicRouter from "./routes/musicRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
connection();

app.get("/", (_, res) => {
	return res.status(200).json({ message: "Music Player App is Running" });
});

app.use("/users", userRouter);
app.use("/music", musicRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
