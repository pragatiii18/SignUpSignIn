const express = require("express");
const connect = require("./db/connection");
const path = require("path");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connect();

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.use("/api", require("./routes/users"));

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
