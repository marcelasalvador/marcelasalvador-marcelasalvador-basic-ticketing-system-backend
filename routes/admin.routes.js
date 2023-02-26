const express = require("express")
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware")

const router = express.Router()

router.get("/admin-dashboard", isAuthenticated,isAdmin, (req, res) => {
    res.send("Welcome to the admin dashboard!");
  });

module.exports = router