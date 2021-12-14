const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.get("/recent", userCtrl.getLastSignup);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", userCtrl.deleteUser);

module.exports = router;
