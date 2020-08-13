const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route        POST api/Posts
//@desc         Create a post
//@access       private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "server error" });
    }
  }
);

//@route        Get api/Posts
//@desc         get all posts
//@access       private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).select("-__v");
    res.send(posts);
  } catch (err) {
    console.log(err.messsage);
    res.status(500).json({ msg: "server error" });
  }
});

//@route        Get api/Posts/me
//@desc         get my posts
//@access       private
router.get("/me", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ date: -1 })
      .select("-__v");
    res.send(posts);
  } catch (err) {
    console.log(err.messsage);
    res.status(500).json({ msg: "server error" });
  }
});

//@route        Get api/Posts/:id
//@desc         get a post by id
//@access       private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id }).select("-__v");
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    res.send(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//@route        Delete api/Posts/:id
//@desc         delete a post by id
//@access       private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndRemove({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!post) {
      //if a post not found or not my own post
      return res.status(404).json({ msg: "cannot delete others posts" });
    }
    res.send(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "invalid post id format" }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//@route        Put api/Posts/like/:id
//@desc         like a post by id
//@access       private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    likes = post.likes.filter((like) => like.user.toString() === req.user.id);
    if (likes.length == 0) {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      return res.send(post);
    }
    res.status(400).json({ msg: "cannot like post more than one time" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "invalid post id format" }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//@route        Put api/Posts/unlike/:id
//@desc         unlike a post by id
//@access       private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    //another way
    // likes = post.likes.map(like => like.user);
    // removeindex = likes.indexOf(req.user.id);
    // if (likes.includes(req.user.id)) {
    //   post.likes.splice(removeindex, 1);
    //   await post.save();
    //   return res.send(post);
    // }

    const likes = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    );
    if (likes.length > 0) {
      removeindex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeindex, 1);
      await post.save();
      return res.send(post);
    }
    res.status(400).json({ msg: "no likes for you here" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "invalid post id format" }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//@route        Put api/Posts/comment/:id
//@desc         add comment to a post by id
//@access       private
router.put(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "post not found" });
      }
      const user = await User.findById(req.user.id).select("-password");
      newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.send(post);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "invalid post id format" }); //if not a valid id
      }
      console.log(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

//@route        Delete api/Posts/comment/:id/:commentid
//@desc         delete comment from a post by id
//@access       private
router.delete("/comment/:id/:commentid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentid
    );
    if (!comment) {
      return res.status(404).json({ msg: "comment not found" });
    }
    if (comment.user.toString() != req.user.id) {
      return res.status(404).json({ msg: "unauthorized delete" });
    }
    const removeindex = post.comments
      .map((comment) => comment._id)
      .indexOf(req.params.commentid);
    post.comments.splice(removeindex, 1);
    await post.save();
    res.send(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "invalid post id format" }); //if not a valid id
    }
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

//=============================DONE WITH THE BACK END============================================

module.exports = router;
