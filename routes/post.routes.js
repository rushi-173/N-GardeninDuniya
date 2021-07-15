const express = require("express");
const createPost = require("../controllers/post/createPost");
const getPostsById = require("../controllers/post/getPostById");
const getPostsByUserId = require("../controllers/post/getPostsByUserId");
const router = express.Router();

router.get("/", getPostsByUserId);
router.get("/:postId", getPostsById);
router.post("/", createPost);

module.exports = router;