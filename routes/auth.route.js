const express = require("express");
const { login, signup } = require("../controllers/auth.controller");
const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

// router.route("/login").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
