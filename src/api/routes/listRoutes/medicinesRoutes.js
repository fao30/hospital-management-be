const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const medicinesControllers = require("../../controllers/medicinesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const {
  isPharmacistOrAdminOrManager,
  isPharmacistOrAdminOrManagerOrDoctor,
} = require("../../middlewares/Authorization");

router.post(
  "/",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.createMedicine)
);

router.get(
  "/",
  isPharmacistOrAdminOrManagerOrDoctor,
  tryCatch(medicinesControllers.getAllMedicines)
);

router.get(
  "/:id",
  isPharmacistOrAdminOrManagerOrDoctor,
  tryCatch(medicinesControllers.getMedicineById)
);

router.put(
  "/:id",
  isPharmacistOrAdminOrManagerOrDoctor,
  tryCatch(medicinesControllers.updateMedicines)
);

router.delete(
  "/:id",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.deleteMedicines)
);

router.use(errorMiddleware);

module.exports = router;
