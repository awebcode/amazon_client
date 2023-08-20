const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Options for cookie
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    // path:"/",
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Set SameSite attribute for cross-site cookies
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
