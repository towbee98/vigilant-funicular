const express = require("express");
const config = require("./config/env");
const { RegisterStudent } = require("./email");
const port = config.PORT;

const app = express();

app.use(express.json());
app.post("/api/register", async (req, res) => {
	const { parentName, parentEmail, childName, childAge, message } = req.body;
	res.status(200).json({ message: "Messge sent successfully" });
	await new RegisterStudent(parentEmail, config.EMAIL, {
		childName,
		childAge,
		message,
		parentName,
		parentEmail,
	}).sendRegistrationDetails();
});
app.get("/api/", async (req, res) => {
	res.status(200).json({ message: "success" });
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
