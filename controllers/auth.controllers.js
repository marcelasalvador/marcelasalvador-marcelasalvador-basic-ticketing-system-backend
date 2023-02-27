const bcryptjs = require("bcryptjs")
const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
// const { isAuthenticated } = require("../middleware/jwt.middleware")


const signupController = (req,res,next) => {

    const { email, name, password } = req.body

    if(! email || !password || !name){
        return res.status(400).json ({
            error: {
                message: "Missing email name or password"
            }
        })
    }

   //optional guard statement to check password strength
    bcryptjs.hash(password, 10)
        .then(hashedPassword => {
           return User.create({
            email,
            name,
            password: hashedPassword
           })
        })
        .then(createdUser => {
            res.json(createdUser)
        })
        .catch (err => res.send(err))
}

const loginController = (req,res,next) => {
    const { email, password } = req.body
    if(!email || !password ){
        return res.json({
            error: {
                message: "missing email or password"
            }
        })
    }

    let myUser;

    User.findOne({ email: email})
        .then(foundUser => {
            if(!foundUser) {
                return Promise.reject("Invalid email or password")
            }

            myUser = foundUser
            return bcryptjs.compare(password, foundUser.password)
        })
        .then(isValidPassword => {
            if(!isValidPassword){
                return Promise.reject("invalid email or password ")
            }
            // if (!myUser.isAdmin) {
            //     return Promise.reject('User is not authorized');
            //   }
            const payload ={
                _id: myUser._id,
                name: myUser.name,
                email: myUser.email,
                role: myUser.role
            }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: "HS256", expiresIn: "6h" }
            )

            res.cookie('session', authToken, { httpOnly: true });

            res.json({
                authToken: authToken,   
            })

            console.log("User role:", payload.role);

        })
        .catch(err => res.send(err))
}

module.exports = {
    signupController,
    loginController,
}
