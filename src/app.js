import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./database/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
connection();

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
