const mongoose = require("mongoose");

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB is connected.");
	} catch (err) {
		console.log(err);
		process.exit();
	}
};

module.exports = connect;
