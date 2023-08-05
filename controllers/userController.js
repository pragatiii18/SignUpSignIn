const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register user API
//@route POST /api/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}
	const isUserAvailable = await User.findOne({ email });

	if (isUserAvailable) {
		res.status(400);
		throw new Error("Email already registered, Login");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashedPassword);
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});
	if (user) {
		res.status(200).render("index");
		} else {
		res.status.status(400);
		throw new Error("Invalid user data");
	}
	
});

//@desc Login user API
//@route POST /api/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	const user = await User.findOne({ email });

	//compare password with hashed pw

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).render("loggedIn" , {user : user});

	} else {
		res.status(401);
		throw new Error("Invalid user");
	}
});




module.exports = { registerUser, loginUser};
