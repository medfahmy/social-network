import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import passport from "passport";
import { ProfileModel } from "models/Profile";
import { UserModel } from "models/User";
import { validateProfileInput } from "validation/validate-profile-input";
import { Profile, ProfileErrors } from "types";

const router = express.Router();

// @route GET api/profile
// @desc Get user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: ProfileErrors = {};

    ProfileModel.findOne({ user: req.body.id })
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

// @route GET api/profile/:handle
// @desc Get profile by handle
// @access Public

router.get("/:handle", (req, res) => {
  const errors: ProfileErrors = {};

  ProfileModel.findOne({ user: req.params.handle as any })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "There is no profile for this user!";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({
        profile: "User does not exist or there is no profile for this user!",
      })
    );
});

// @route GET api/profile/all
// @desc Get all profiles
// @access Public

router.get("/all", (req, res) => {
  const errors: ProfileErrors = {};

  ProfileModel.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.profile = "There are no profiles!";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(400).json(err));

  // .catch((err) =>
  //   res.status(404).json({
  //     profile: "There are no profiles!",
  //   })
  // );
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public

router.get("/:handle", (req, res) => {
  const errors: ProfileErrors = {};

  ProfileModel.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "There is no profile for this user!";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json(err));
});

// @route POST api/profile
// @desc Add or edit user profile
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

    const profileFields: Profile = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.employment) profileFields.employment = req.body.employment;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.rel_status) profileFields.rel_status = req.body.rel_status;

    ProfileModel.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //update
        ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //create
        //check handle
        ProfileModel.findOne({ handle: profileFields.handle }).then(
          (profile) => {
            if (profile) {
              errors.handle = "Handle already exists!";
              res.status(400).json(errors);
            }
            //save profile
            new ProfileModel(profileFields)
              .save()
              .then((profile) => res.json(profile));
          }
        );
      }
    });
  }
);
// @route DELETE api/profile
// @desc delete user profile
// @access private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileModel.findOneAndRemove({ user: req.user.id }).then(() => {
      UserModel.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

export { router as profile };
