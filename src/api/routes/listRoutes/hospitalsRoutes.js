const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const HospitalsControllers = require("../../controllers/hospitalsControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");

router.post("/", tryCatch(HospitalsControllers.createHospital));

router.get("/", tryCatch(HospitalsControllers.getAllHospitals));

router.get("/:id", tryCatch(HospitalsControllers.getHospitalById));

router.put("/:id", tryCatch(HospitalsControllers.updateHospital));

router.delete("/:id", tryCatch(HospitalsControllers.deleteHospital));

router.use(errorMiddleware);

module.exports = router;
