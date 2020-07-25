const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

//@route        Post api/users
//@desc         Register route
//@access       Public

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check(
      "password",
      "Enter a valid password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "user already exists" });
      }
      //get users gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt password
      //if we dont use await we will need to user .then() and .catch() to handle the promise
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //reuturn jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            },
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
