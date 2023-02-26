const express = require("express")
const { signupController, loginController } = require("../controllers/auth.controllers")

const { isAdmin } = require("../middleware/jwt.middleware")


const router = express.Router()


// Protected route for the admin dashboard
router.get("/admin-dashboard", isAdmin, (req, res) => {
    res.send("Welcome to the admin dashboard!");
  });
// router.post("/admin-dashboard", isAdmin)




module.exports = router