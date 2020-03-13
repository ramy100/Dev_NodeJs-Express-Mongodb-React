const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
//@route        GET api/Profile/me
//@desc         Get current users profile
//@access       Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

//@route        post api/Profile
//@desc         create or update user profile
//@access       Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('skills', 'skills are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      linkedin
    } = req.body; //object destructure

    //buld profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (company) profileFields.website = website;
    if (company) profileFields.location = location;
    if (company) profileFields.bio = bio;
    if (company) profileFields.status = status;
    if (company) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim()); //getting array of skills without the white spaces
    }

    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

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
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
