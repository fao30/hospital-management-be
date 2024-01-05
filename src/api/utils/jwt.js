const jwt = require("jsonwebtoken");
require("../../../dotEnvInit");

const jwtToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role_id,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const decodeToken = (token) => {
  const res = jwt.verify(token, process.env.JWT_SECRET);
  const { id, email, role_id, hospital_id } = res.user;
  return { id, email, role_id, hospital_id };
};

module.exports = { jwtToken, decodeToken };
