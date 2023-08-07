const express = require("express");
const protect = require("../middleware/authorization");
const userController = require("../controllers/userController");
const router = express.Router();


// router.route("/").get(protect, userController.getUsers);
router.get("/", userController.getUsers);
router.route("/profile").get(protect, userController.getUserProfile);

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

router.route("/update").post(protect, userController.updateUser);
router.route("/remove").delete(protect, userController.deleteUser);

module.exports = router;
