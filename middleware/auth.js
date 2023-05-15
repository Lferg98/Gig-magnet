const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.get('Authorization');

  // If there is no Authorization header, set isAuth to false and call next middleware
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // If there is no token or token is an empty string, set isAuth to false and call next middleware
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    // Decode the token using the secret key
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // If there is an error during decoding, set isAuth to false and call next middleware
    req.isAuth = false;
    return next();
  }

  // If the token cannot be decoded, set isAuth to false and call next middleware
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // Set isAuth to true and set the userId from the decoded token on the request object
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
