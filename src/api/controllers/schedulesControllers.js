const SchedulesService = require("../service/scheduleService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class schedulesController {
  static async createSchedule(req, res) {
    const schedule = await SchedulesService.createSchedule(req.body);

    if (!schedule) {
      throw new AppError(BAD_REQUEST, "Cannot create schedule", 400);
    }

    return res.status(CREATED).json({ schedule });
  }

  static async getAllSchedules(req, res) {
    const schedules = await SchedulesService.findAllSchedules();

    if (!schedules.length) {
      throw new AppError(NO_CONTENT, "schedules not found", 400);
    }

    return res.status(OK).json({ schedules });
  }

  static async getScheduleById(req, res) {
    const { id } = req.params;
    const schedule = await SchedulesService.findScheduleById(id);

    if (!schedule) {
      throw new AppError(NOT_FOUND, "schedule not found", 400);
    }

    return res.json({ schedule });
  }

  static async updateSchedule(req, res) {
    const { id } = req.params;
    const {
      doctor_id,
      patient_id,
      admin_id,
      is_admin_approved,
      is_doctor_approved,
      date_time,
      status,
    } = req.body;
    const oldSchedule = await SchedulesService.findScheduleById(id);

    if (!oldSchedule) {
      throw new AppError(NOT_FOUND, "Schedule not found to update", 400);
    }

    oldSchedule.doctor_id = doctor_id;
    oldSchedule.patient_id = patient_id;
    oldSchedule.admin_id = admin_id;
    oldSchedule.is_admin_approved = is_admin_approved;
    oldSchedule.is_doctor_approved = is_doctor_approved;
    oldSchedule.date_time = date_time;
    oldSchedule.is_doctor_approved = is_doctor_approved;
    oldSchedule.status = status;

    const newSchedule = oldSchedule.save();

    return res.json({ message: "Updated" });
  }

  static async deleteSchedule(req, res) {
    const { id } = req.params;

    const deleted = await SchedulesService.deleteSchedule(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete schedule", 400);
    }

    return res.json({ message: "schedule deleted" });
  }
}
module.exports = schedulesController;
