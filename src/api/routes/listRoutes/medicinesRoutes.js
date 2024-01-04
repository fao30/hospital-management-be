const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const medicinesControllers = require("../../controllers/medicinesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const {
  isPharmacistOrAdminOrManager,
} = require("../../middlewares/Authorization");

router.post(
  "/",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.createMedicine)
);

router.get(
  "/",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.getAllMedicines)
);

router.get(
  "/:id",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.getMedicineById)
);

router.put(
  "/:id",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.updateMedicines)
);

router.delete(
  "/:id",
  isPharmacistOrAdminOrManager,
  tryCatch(medicinesControllers.deleteMedicines)
);

router.use(errorMiddleware);

module.exports = router;
