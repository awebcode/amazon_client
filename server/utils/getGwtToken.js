const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
     secure: true, // Set to true for production (HTTPS)
    // // domain: process.env.COOKIE_DOMAIN || "localhost", // Set to your domain or "localhost"
     sameSite: "strict", // Set SameSite attribute for cross-site cookies
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
