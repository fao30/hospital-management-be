const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const SchedulesControllers = require("../../controllers/schedulesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");

router.post("/", tryCatch(SchedulesControllers.createSchedule));

router.get("/", tryCatch(SchedulesControllers.getAllSchedules));

router.get("/:id", tryCatch(SchedulesControllers.getScheduleById));

router.put("/:id", tryCatch(SchedulesControllers.updateSchedule));

router.delete("/:id", tryCatch(SchedulesControllers.deleteSchedule));

router.use(errorMiddleware);

module.exports = router;
