const Post = require("../models/post");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(200).json({
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  deletePost,
  updatePost,
  createPost,
};
