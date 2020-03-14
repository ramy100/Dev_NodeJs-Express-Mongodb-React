const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route        POST api/Posts
//@desc         Create a post
//@access       private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: 'server error' });
    }
  }
);

//@route        Get api/Posts
//@desc         get all posts
//@access       private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .select('-__v');
    res.send(posts);
  } catch (err) {
    console.log(err.messsage);
    res.status(500).json({ msg: 'server error' });
  }
});

//@route        Get api/Posts/me
//@desc         get my posts
//@access       private
router.get('/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ date: -1 })
      .select('-__v');
    res.send(posts);
  } catch (err) {
    console.log(err.messsage);
    res.status(500).json({ msg: 'server error' });
  }
});

//@route        Get api/Posts/:id
//@desc         get a post by id
//@access       private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id }).select('-__v');
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.send(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//@route        Delete api/Posts/:id
//@desc         delete a post by id
//@access       private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndRemove({
      _id: req.params.id,
      user: req.user.id
    });
    if (!post) {
      //if a post not found or not my own post
      return res.status(404).json({ msg: 'cannot delete others posts' });
    }
    res.send(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'invalid post id format' }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;
