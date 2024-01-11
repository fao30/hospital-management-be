const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const listPricesControllers = require("../../controllers/listPricesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const {
  isPharmacistOrAdminOrManager,
  isPharmacistOrAdminOrManagerOrDoctor,
} = require("../../middlewares/Authorization");

router.post(
  "/",
  isPharmacistOrAdminOrManager,
  tryCatch(listPricesControllers.createListPrices)
);

router.get(
  "/",
  isPharmacistOrAdminOrManagerOrDoctor,
  tryCatch(listPricesControllers.findAllListPricess)
);

router.get(
  "/:id",
  isPharmacistOrAdminOrManagerOrDoctor,
  tryCatch(listPricesControllers.findListPricesById)
);

router.put(
  "/:id",
  isPharmacistOrAdminOrManagerOrDoctor,
  tryCatch(listPricesControllers.updateListPricesById)
);

router.delete(
  "/:id",
  isPharmacistOrAdminOrManager,
  tryCatch(listPricesControllers.deleteListPrices)
);

router.use(errorMiddleware);

module.exports = router;
