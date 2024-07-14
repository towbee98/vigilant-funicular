const express = require("express");
const cors = require("cors");
const config = require("./config/env");
const { RegisterStudent } = require("./email");
const task = require("./cron");
const port = config.PORT;

const app = express();

app.use(
	cors({
		origin: ["http://127.0.0.1:5500", "https://standardlaneschool.com.ng"],
		allowedHeaders: "Content-Type, Authorization",
		methods: "POST",
	})
);

task.start();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", async (req, res) => {
	try {
		console.log(req.body);
		const {
			parentName,
			parentEmail,
			parentPhone,
			childName,
			childAge,
			message,
		} = req.body;
		await new RegisterStudent(parentEmail, `info@standardlaneschool.com.ng`, {
			childName,
			childAge,
			message,
			parentName,
			parentEmail,
			parentPhone,
		}).sendRegistrationDetails();

		res
			.status(200)
			.json({ status: "success", message: "Messge sent successfully" });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
});

app.post("/api/contact", async (req, res) => {
	const { name, email, subject, message } = req.body;
	// await new RegisterStudent(email, config.EMAIL, {
	// 	name,
	// 	email,
	// 	subject,
	// 	message,
	// }).sendRegistrationDetails();
	res.status(200).json({ message: "Email registered successfully." });
});

app.get("/api/", async (req, res) => {
	res.status(200).json({ message: "success" });
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
