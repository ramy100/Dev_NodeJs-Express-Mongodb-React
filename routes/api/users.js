const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult, body } = require("express-validator");
require("dotenv").config();
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
    body("passwordconfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.errors.reduce(
        (acc, cur) => ({ ...acc, [cur.param]: cur.msg }),
        {}
      );
      return res.status(400).json({ errorMessages });
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (user) {
        const errorMessages = { email: "email already exists" };
        return res.status(400).json({ errorMessages });
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
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
