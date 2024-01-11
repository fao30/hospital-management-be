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
    const visit = await VisitsService.createVisit({
      ...req.body,
      creator_id: id || null,
      modifier_id: id || null,
    });

    if (!visit) {
      throw new AppError(BAD_REQUEST, "Cannot create visit", 400);
    }

    return res.status(CREATED).json({ visit });
  }

  static async getAllVisits(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 5;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }
    const { rows, count } = await VisitsService.findAllVisits(limit, page, req);

    if (!rows) throw new AppError(NO_CONTENT, "No visits found", 400);

    return res.json({
      visits: rows,
      totalPage: Math.ceil(count / limit),
      count,
    });
  }

  static async getVisitById(req, res) {
    const { id } = req.params;
    const visit = await VisitsService.findVisitById(req, id);

    if (!visit) {
      throw new AppError(NOT_FOUND, "visit not found", 400);
    }

    return res.json({ visit });
  }

  static async updateVisit(req, res) {
    const { id } = req.params;
    const { id: id_requester } = req.headers;
    const oldVisit = await VisitsService.findVisitById(req, id);

    if (!oldVisit) {
      throw new AppError(NOT_FOUND, "Visit not found to update", 400);
    }
    const {
      weight,
      patient_id,
      date_end,
      hospital_id,
      date_start,
      paid_amount,
      due_amount,
      payment_status_id,
      temperature,
      blood_presure,
      diagnosis,
      case_notes,
      height,
      is_patient_discharged,
    } = req.body;

    oldVisit.payment_status_id = payment_status_id;
    oldVisit.patient_id = patient_id;
    oldVisit.hospital_id = hospital_id;
    oldVisit.due_amount = due_amount;
    oldVisit.paid_amount = paid_amount;
    if (date_start) {
      oldVisit.date_start = date_start;
    }
    oldVisit.date_end = date_end;
    oldVisit.weight = weight;
    oldVisit.height = height;
    oldVisit.temperature = temperature;
    oldVisit.blood_presure = blood_presure;
    oldVisit.diagnosis = diagnosis;
    oldVisit.case_notes = case_notes;
    oldVisit.is_patient_discharged = is_patient_discharged;
    oldVisit.modifier_id = id_requester;

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
