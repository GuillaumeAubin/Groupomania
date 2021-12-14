const express = require("express");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const router = express.Router();

// GET //
router.get("/", auth, commentCtrl.getAllComments);

// GET Comment post //
router.get("/ofpost/:id", auth, commentCtrl.getCommentsForOnePost);

// DELETE single comment //
router.delete("/:id", auth, commentCtrl.deleteComment);

// DELETE Comment post //
router.delete("/ofpost/:id", auth, commentCtrl.deleteCommentsForOnePost);

// POST //
router.post("/:postId", auth, commentCtrl.createComment);

// DELETE //
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
