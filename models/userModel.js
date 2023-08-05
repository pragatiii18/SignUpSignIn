const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please add a username"],
			unique: [true, "This username is already taken"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: [true, "Email is already in use"],
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = User = mongoose.model("User", userSchema);
