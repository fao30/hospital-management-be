const router = require("express").Router();
const passport = require("passport");
const { tryCatch } = require("../../utils/tryCatch");
const { NO_CONTENT } = require("../../constants/statusCode");

router.post(
  "/",
  passport.authenticate("register", { session: false }),
  tryCatch(async (req, res) => {
    if (!req.user) {
      throw new AppError(NO_CONTENT, "User in not registered yet");
    }

    const { role_id, id, email } = req.user;
    let message = "Successfully registered as ";
    // const query = {
    //   email: email.toLowerCase(),
    // };
    // const duplicate = await userService.findUserQuery(query);
    // const duplicateUser = duplicate[0];

    if (role_id === 2) {
      message += "MANAGER HOSPITAL";
    } else if (role_id === 3) {
      message += "ADMIN HOSPITAL";
    } else if (role_id === 4) {
      message += "DOCTOR";
    } else if (role_id === 5) {
      message += "PATIENT";
    } else if (role_id === 6) {
      message += "PHARMACIST";
    }
    return res.json({
      message,
      info: {
        id: id,
        email: email,
        role: role_id,
      },
    });
  })
);

module.exports = router;
