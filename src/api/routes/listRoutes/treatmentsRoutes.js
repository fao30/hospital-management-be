const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const TreatmentsControllers = require("../../controllers/treatmentsControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const {
  isDoctor,
  isDoctorOrAdminOrManager,
} = require("../../middlewares/Authorization");

//ONLY DOCTOR CAN MAKE A TREATMENT
router.post("/", isDoctor, tryCatch(TreatmentsControllers.createTreatment));

router.get(
  "/",
  isDoctorOrAdminOrManager,
  tryCatch(TreatmentsControllers.getAllTreatments)
);

router.get(
  "/:id",
  isDoctorOrAdminOrManager,
  tryCatch(TreatmentsControllers.getTreatmentById)
);

router.put(
  "/:id",
  isDoctorOrAdminOrManager,
  tryCatch(TreatmentsControllers.updateTreatments)
);

router.delete(
  "/:id",
  isDoctorOrAdminOrManager,
  tryCatch(TreatmentsControllers.deleteTreatments)
);

router.use(errorMiddleware);

module.exports = router;
