const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");

const app = express();

//Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DB config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log(`****  mongodb connected ****`))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => res.send("hello there"));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/post", post);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`  ****   server running on port ${port} ****`)
);
