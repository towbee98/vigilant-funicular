const express = require("express");
const cors = require("cors");
const config = require("./config/env");
const { RegisterStudent } = require("./email");

const port = config.PORT;

const app = express();

app.use(
	cors({
		origin: "*",
	})
);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Allow requests from your development origin
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
	res.header("Access-Control-Allow-Methods", "POST"); // Allow POST method
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", async (req, res) => {
	try {
		console.log(req.body);
		const { parentName, parentEmail, childName, childAge, message } = req.body;
		await new RegisterStudent(parentEmail, config.EMAIL, {
			childName,
			childAge,
			message,
			parentName,
			parentEmail,
		}).sendRegistrationDetails();

		res
			.status(200)
			.json({ status: "success", message: "Messge sent successfully" });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.post("/api/wishlist", async (req, res) => {
	res.status(200).json({ message: "Email registered successfully." });
});

app.get("/api/", async (req, res) => {
	res.status(200).json({ message: "success" });
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
