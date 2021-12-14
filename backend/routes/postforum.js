const express = require("express");
// const auth = require('../middleware/auth')
const postforumCtrl = require("../controllers/postforum");
const router = express.Router();

// GET ALL CATEGORIES//
router.get("/allCategories", postforumCtrl.getAllCategories);

//GET ALL TOPICS FROM CATEGORY 1//
router.get("/allTopicsCat1", postforumCtrl.getAllTopicsCat1);

module.exports = router;
