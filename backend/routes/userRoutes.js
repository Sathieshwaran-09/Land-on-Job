const express = require("express");
const { register, login, logout, getUser } = require("../controllers/userController");
const isAuthenticated = require("../middlewares/auth.js");

const router= express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/logout', isAuthenticated, logout)
router.get("/getuser", isAuthenticated, getUser);

module.exports = router;