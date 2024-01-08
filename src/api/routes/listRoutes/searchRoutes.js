const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const SearchControllers = require("../../controllers/searchControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const { isAdminOrManager } = require("../../middlewares/Authorization");

router.get(
  "/user",
  isAdminOrManager,
  tryCatch(SearchControllers.searchUserByKeywords)
);

router.use(errorMiddleware);

module.exports = router;
