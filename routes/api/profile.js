const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const { validate } = require("../../models/User");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");

// @route GET api/profiles/test
// @desc Tests profiles route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "routes /profiles works!" }));

// @route GET api/profile
// @desc Get user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.profile = "There is no profile for this user!";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route POST api/profile
// @desc Create user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get fields
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.employment) profileFields.employment = req.body.employment;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.rel_status) profileFields.rel_status = req.body.rel_status;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //create
        //check handle
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "Handle already exists!";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
