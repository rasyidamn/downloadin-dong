import express from "express";
import routes from "./routes/routes.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors({
	origin: process.env.FRONTEND_URL
}))

app.use("/api", routes)

app.get("/", (req, res) => {
	res.send("haloo");
});



app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
