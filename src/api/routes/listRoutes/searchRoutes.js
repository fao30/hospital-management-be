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

router.get(
  "/medicines",
  isAdminOrManager,
  tryCatch(SearchControllers.searchMedicineByKeywords)
);

router.use(errorMiddleware);

module.exports = router;
