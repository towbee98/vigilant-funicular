const cron = require("node-cron");

const task = cron.schedule("0/10 * * * *", () => {
	console.log("Running cron job every 10 minutes!");
	// Replace this with your actual task logic
});

module.exports = task;
