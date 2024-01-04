const VisitsService = require("../service/visitService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class visitsController {
  static async createVisit(req, res) {
    const visit = await VisitsService.createVisit(req.body);

    if (!visit) {
      throw new AppError(BAD_REQUEST, "Cannot create visit", 400);
    }

    return res.status(CREATED).json({ visit });
  }

  static async getAllVisits(req, res) {
    const visits = await VisitsService.findAllVisits(req);

    if (!visits.length) {
      throw new AppError(NO_CONTENT, "visits not found", 400);
    }

    return res.status(OK).json({ visits });
  }

  static async getVisitById(req, res) {
    const { id } = req.params;
    const visit = await VisitsService.findVisitById(id);

    if (!visit) {
      throw new AppError(NOT_FOUND, "visit not found", 400);
    }

    return res.json({ visit });
  }

  static async updateVisit(req, res) {
    const { id } = req.params;
    const oldVisit = await VisitsService.findVisitById(id);

    if (!oldVisit) {
      throw new AppError(NOT_FOUND, "Visit not found to update", 400);
    }

    oldVisit.payment_status_id = payment_status_id;
    oldVisit.patient_id = patient_id;
    oldVisit.hospital_id = hospital_id;
    oldVisit.due_amount = due_amount;
    oldVisit.paid_amount = paid_amount;
    oldVisit.date_start = date_start;
    oldVisit.date_end = date_end;
    oldVisit.weight = weight;
    oldVisit.height = height;
    oldVisit.temperature = temperature;
    oldVisit.blood_presure = blood_presure;
    oldVisit.diagnosis = diagnosis;
    oldVisit.case_notes = case_notes;
    oldVisit.is_patient_discharged = is_patient_discharged;

    const newVisit = oldVisit.save();

    return res.json({ message: "Updated" });
  }

  static async deleteVisit(req, res) {
    const { id } = req.params;

    const deleted = await VisitsService.deleteVisit(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete Visit", 400);
    }

    return res.json({ message: "Visit deleted" });
  }
}
module.exports = visitsController;
