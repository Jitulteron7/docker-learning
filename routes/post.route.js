const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getOnePost,
} = require("../controllers/post.controller");
const router = express.Router();

// router.route("/test").get(async (req, res, next) => {
//   res.json({
//     message: "post api running",
//   });
// });

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
