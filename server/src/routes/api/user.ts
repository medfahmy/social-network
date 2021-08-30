import express from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
// import keys from "../../config/keys";
import { validateRegisterInput } from "validation/validate-register-input";
import { validateLoginInput } from "validation/validate-login-input";
import { UserModel } from "models/User";
import { config } from "config";
import { UserErrors } from "types";

const router = express.Router();

// @route POST api/user/register
// @desc register user
// @access public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route GET api/user/login
// @desc login user / Returning JWT Token
// @access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  UserModel.findOne({ email }).then((user) => {
    // check for user
    if (!user) {
      errors.email = "User not found!";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        //user matched
        const payload = { id: user.id, name: user.name };

        //sign token
        jwt.sign(payload, config.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            succes: true,
            token: "Bearer " + token,
          });
        });
      } else {
        errors.password = "Password incorrect!";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/user/current
// @desc return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
    });
  }
);

// @route GET api/user/all
// @desc get all users
// @access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: UserErrors = {};
    UserModel.find()
      .populate("user", ["email", "password"])
      .then((users) => {
        if (!users) {
          errors.user = "There are no users!";
          return res.status(404).json(errors);
        }
        res.json(users);
      })

      .catch((err) => res.status(400).json(err));
  }
);

export { router as user };
