// Middleware to Protect Routes
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    console.log("No token, authorization denied");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token is not valid");
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
