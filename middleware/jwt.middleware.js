const { expressjwt: jwt } = require("express-jwt")
const jwtDecode = require('jwt-decode');

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "myPayload",
  getToken: getTokenFromHeaders
});

// Function used to extracts the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}

// Define middleware to check if user has admin role
const isAdmin = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role === 'admin') {
      next();
    } else {
      res.status(403).send("Access denied");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};


// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isAdmin
};

