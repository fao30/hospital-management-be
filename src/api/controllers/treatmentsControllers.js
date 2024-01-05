const TreatmentService = require("../service/treatmentService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class treatmentController {
  static async createTreatment(req, res) {
    const { role_id } = req.headers;

    const treatment = await TreatmentService.createTreatment({
      ...req.body,
      doctor_id: role_id || null,
    });

    if (!treatment) {
      throw new AppError(BAD_REQUEST, "Cannot create treatment", 400);
    }

    return res.status(CREATED).json({ treatment });
  }

  static async getAllTreatments(req, res) {
    const treatments = await TreatmentService.findAllTreatments();

    if (!treatments.length) {
      throw new AppError(NO_CONTENT, "treatments not found", 400);
    }

    return res.status(OK).json({ treatments });
  }

  static async getTreatmentById(req, res) {
    const { id } = req.params;
    const treatment = await TreatmentService.findTreatmentById(id);

    if (!treatment) {
      throw new AppError(NOT_FOUND, "treatment not found", 400);
    }

    return res.json({ treatment });
  }

  static async updateTreatments(req, res) {
    const { id } = req.params;
    const { doctor_id, medical_treatment, currency, price, visit_id } =
      req.body;

    const oldTreatments = await TreatmentService.findTreatmentById(id);

    if (!oldTreatments) {
      throw new AppError(NOT_FOUND, "Treatments not found to update", 400);
    }

    oldTreatments.doctor_id = doctor_id;
    oldTreatments.medical_treatment = medical_treatment;
    oldTreatments.currency = currency;
    oldTreatments.price = price;
    oldTreatments.visit_id = visit_id;

    const newTreatments = oldTreatments.save();

    return res.json({ message: "Updated" });
  }

  static async deleteTreatments(req, res) {
    const { id } = req.params;

    const deleted = await TreatmentService.deleteTreatments(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete Treatments", 400);
    }

    return res.json({ message: "Treatments deleted" });
  }
}
module.exports = treatmentController;
