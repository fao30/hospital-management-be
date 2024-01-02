const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const AppError = require("../../helpers/AppError");
const errorMiddleware = require("../../middlewares/ErrorMindellwares");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(NO_CONTENT, "Email or Password required");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError(NO_CONTENT, "User is undefined");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError(NO_CONTENT, "Email or Password invalid");
    }

    const payload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    };

    const token = jwt.sign({ user: payload }, process.env.ACCESS_TOKEN_SECRET);

    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
