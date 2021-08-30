import express from "express";
import mongoose from "mongoose";
import passport from "passport";

import { user } from "routes/api/user";
import { profile } from "routes/api/profile";
import { post } from "routes/api/post";
import { log } from "logger";
import { config } from "config";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => log.info(`mongodb connected`))
  .catch((err) => {
    log.error("db error, err");
    process.exit(1);
  });

// app.get("/", (req, res) => res.send("hello there"));

//Passport middleware
app.use(passport.initialize());

//Passport config
// require("./config/passport")(passport);

app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/post", post);

app.listen(config.port, () =>
  log.info(`server running at http://${config.host}:${config.port}`)
);
