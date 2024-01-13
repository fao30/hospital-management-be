const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const medicineTreatmentsControllers = require("../../controllers/MedicineTreatmentsControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const { isDoctorOrAdminOrManager } = require("../../middlewares/Authorization");

router.post(
  "/",
  isDoctorOrAdminOrManager,
  tryCatch(medicineTreatmentsControllers.createMedicineTreatment)
);

router.get(
  "/",
  isDoctorOrAdminOrManager,
  tryCatch(medicineTreatmentsControllers.getAllMedicineTreatments)
);

router.get(
  "/:id",
  isDoctorOrAdminOrManager,
  tryCatch(medicineTreatmentsControllers.getMedicineTreatmentById)
);

router.put(
  "/:id",
  isDoctorOrAdminOrManager,
  tryCatch(medicineTreatmentsControllers.updateMedicineTreatments)
);

router.delete(
  "/:id",
  isDoctorOrAdminOrManager,
  tryCatch(medicineTreatmentsControllers.deleteMedicineTreatments)
);

router.use(errorMiddleware);

module.exports = router;
