const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
require("dotenv").config();
const request = require("request");
const User = require("../../models/User");
const { check, validationResult, body } = require("express-validator");

//@route        GET api/Profile/me
//@desc         Get current users profile
//@access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

//@route        post api/Profile
//@desc         create or update user profile
//@access       Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").exists().not().isEmpty(),
      check("skills", "skills are required").exists().not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.errors.reduce(
        (prev, current) => ({ ...prev, [current.param]: current.msg }),
        {}
      );
      return res.status(400).json({ errorMessages });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body; //object destructure
    //buld profile object
    const profileFields = {
      user: req.user.id,
      company: company || "",
      website: website || "",
      location: location || "",
      bio: bio || "",
      status,
      githubusername: githubusername || "",
      skills: [...skills].map((skill) => skill.trim()),
      social: {
        youtube: youtube || "",
        twitter: twitter || "",
        facebook: facebook || "",
        linkedin: linkedin || "",
        instagram: instagram || "",
      },
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //if not found create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route        Get api/Profile/:pageNum
//@desc         Get all profiles
//@access       public
router.get("/:pageNum", async (req, res) => {
  const { pageNum } = req.params;
  const limit = 7;
  try {
    const profiles = await Profile.find()
      .skip(limit * pageNum)
      .limit(limit)
      .sort("-date")
      .populate("user", ["name", "avatar", "email"]);
    const count = await Profile.estimatedDocumentCount();
    const pages = count / limit;
    res.json({ profiles, pages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route        Get api/Profile/user/:user_id
//@desc         Get profile by user id
//@access       public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "profile not found" });
    }

    res.send(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      //to handle if user entered a non valid id value that cannot be casted to object id
      return res.status(400).json({ msg: "profile not found" });
    }
    res.status(500).send("server error");
  }
});

//@route        Delete api/Profile
//@desc         Delete user and his profile
//@access       private
router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route        Put api/Profile/experience
//@desc         add experience to user profile
//@access       private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company name is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
      body("to").custom((value, { req }) => {
        if (!req.body.current && !value) {
          throw new Error("Ending date is required");
        } else if (new Date(req.body.from) >= new Date(value)) {
          throw new Error("Ending date should be past start date");
        }
        return true;
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.errors.reduce(
        (prev, current) => ({ ...prev, [current.param]: current.msg }),
        {}
      );
      return res.status(400).json({ errorMessages });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route        Delete api/Profile/experience
//@desc         delete experience from user profile
//@access       private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((experience) => experience.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route        Put api/Profile/education
//@desc         add education to user profile
//@access       private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree name is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "from Date is required").not().isEmpty(),
      body("to").custom((value, { req }) => {
        if (!req.body.current && !value) {
          throw new Error("Ending date is required");
        } else if (new Date(req.body.from) >= new Date(value)) {
          throw new Error("Ending date should be past start date");
        }
        return true;
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.errors.reduce(
        (prev, current) => ({ ...prev, [current.param]: current.msg }),
        {}
      );
      return res.status(400).json({ errorMessages });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route        Delete api/Profile/education
//@desc         delete education from user profile
//@access       private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((education) => education.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//@route        GEt api/Profile/github/:username
//@desc         Get user repos form github
//@access       public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.gitbub.com/users/${req.params.userma}/repos?per_page=5&sort=created:asc&client_id=${process.env.GIT_CLIENT_ID}&client_secret=${process.env.GIT_HUB_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      if (response.statusCode !== 500) {
        res.statusCode(404).json({ msg: "no Github profile for this user" });
      }
      res.json({ body });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
