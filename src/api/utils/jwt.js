const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role_id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const decodeToken = (token) => {
  const res = jwt.verify(token, process.env.JWT_SECRET);
  const { id, email, role } = res;
  return { id, email, role };
};

module.exports = { jwtToken, decodeToken };
