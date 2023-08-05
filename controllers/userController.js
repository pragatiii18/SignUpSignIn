const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register user API
//@route POST /api/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		res.status(400).render("signup" , {
			message: 'All fields are Mandatory',
			
		});
	}
	const isUserAvailable = await User.findOne({ email });
	const isUsername = await User.findOne({username })
	if (isUserAvailable) {
		res.status(400).render("signup" , {
			message: 'Email already registered. Login.',
			
		});
	}

	if (isUsername) {
		res.status(400).render("signup" , {
			message: 'Username already taken, try another username.',
			
		});
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
			res.status(401).render("signup" , {
				message: 'Something went wrong, retry.',
				
			});
	}
	
});

//@desc Login user API
//@route POST /api/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).render("login" , {
			message: 'All fields are Mandatory',
			
		});
	}

	const user = await User.findOne({ email });

	//compare password with hashed pw

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).render("loggedIn" , {user : user});

	} else {
		res.status(401).render("login" , {
			message: 'Invalid User',
			
		});
	}
});




module.exports = { registerUser, loginUser};
