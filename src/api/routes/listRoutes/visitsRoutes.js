const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const VisitsControllers = require("../../controllers/visitsControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");

router.post("/", tryCatch(VisitsControllers.createVisit));

router.get("/", tryCatch(VisitsControllers.getAllVisits));

router.get("/:id", tryCatch(VisitsControllers.getVisitById));

router.put("/:id", tryCatch(VisitsControllers.updateVisit));

router.delete("/:id", tryCatch(VisitsControllers.deleteVisit));

router.use(errorMiddleware);

module.exports = router;
