// a middleware to check if the user is an admin or not
const admin = (req, res, next) => {
  const key = req.header("x-auth-key");

  if (key !== process.env.ADMIN_KEY || !key) {
    console.log("Not an admin, authorization denied");
    return res
      .status(401)
      .json({ message: "Not an admin, authorization denied" });
  }

  next();
};

export default admin;
