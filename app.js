require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//DB Connection
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		userUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("DB CONNECTED");
	});

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//PORT
const port = process.env.PORT || 8000;

// Server Starting
app.listen(port, () => {
	console.log(`app is running at ${port}`);
});
