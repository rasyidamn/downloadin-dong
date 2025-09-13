import express from "express";
import routes from "./routes/routes.js"
import cors from "cors"

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(cors())

app.use("/api", routes)

app.get("/", (req, res) => {
	res.send("haloo");
});



app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
