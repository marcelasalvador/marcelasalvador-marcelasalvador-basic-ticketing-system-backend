const express = require("express")
const { signupController, loginController } = require("../controllers/auth.controllers")

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware")


const router = express.Router()



router.post("/signup", signupController)
router.post("/login", loginController )
router.get("/verify", isAuthenticated, (req,res,next) => {
    console.log(req.myPayload);
    res.status(200).json(req.myPayload)
})



module.exports = router