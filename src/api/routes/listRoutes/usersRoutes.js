const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const UsersControllers = require("../../controllers/usersControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const { isAdminOrManager } = require("../../middlewares/Authorization");

router.get("/", isAdminOrManager, tryCatch(UsersControllers.getAllUsers));

router.use(errorMiddleware);

module.exports = router;
