const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//@route        Post api/users
//@desc         Register route
//@access       Public

router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check(
      'password',
      'Enter a valid password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send('User route');
  }
);

module.exports = router;
