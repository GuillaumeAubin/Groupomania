const express = require("express");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const router = express.Router();

// GET //
router.get("/", auth, postCtrl.getAllPosts);

// GET last three posts
router.get("/lastactivitypost", auth, postCtrl.getLastActivityPost);

// UPDATE //
router.put("/:id", auth, multer, postCtrl.modifyPost);

// POST //
router.post("/", auth, multer, postCtrl.createPost);

// DELETE //
router.delete("/:id", auth, commentCtrl.deleteAllComments, postCtrl.deletePost);

module.exports = router;
