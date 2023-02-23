const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getOnePost,
} = require("../controllers/post.controller");
const protect = require("../middleware/auth");
const router = express.Router();

// router.route("/test").get(async (req, res, next) => {
//   res.json({
//     message: "post api running",
//   });
// });

router.route("/").get(protect, getAllPosts).post(protect, createPost);

router
  .route("/:id")
  .get(protect, getOnePost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
