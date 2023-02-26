const express = require("express")
const { signupController, loginController } = require("../controllers/auth.controllers")

const { isAdmin } = require("../middleware/jwt.middleware")


const router = express.Router()



router.post("/admin-dashboard", isAdmin)




module.exports = router