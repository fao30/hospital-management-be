const MedicineTreatmentsServices = require("../service/medicineTreatmentsServices");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class medicineTreatmentController {
  static async createMedicineTreatment(req, res) {
    const { hospital_id } = req.headers;

    const medicine_treatment =
      await MedicineTreatmentsServices.createMedicineTreatment({
        ...req.body,
        hospital_id: hospital_id || null,
      });

    if (!medicine_treatment) {
      throw new AppError(BAD_REQUEST, "Cannot create medicine_treatment", 400);
    }

    return res.status(CREATED).json({ medicine_treatment });
  }

  static async getAllMedicineTreatments(req, res) {
    const medicine_treatments =
      await MedicineTreatmentsServices.findAllMedicineTreatments();

    if (!medicine_treatments.length) {
      throw new AppError(NO_CONTENT, "medicine_treatments not found", 400);
    }

    return res.status(OK).json({ medicine_treatments });
  }

  static async getMedicineTreatmentById(req, res) {
    const { id } = req.params;
    const medicine_treatment =
      await MedicineTreatmentsServices.findMedicineTreatmentById(id);

    if (!medicine_treatment) {
      throw new AppError(NOT_FOUND, "medicine_treatment not found", 400);
    }

    return res.json({ medicine_treatment });
  }

  static async updateMedicineTreatments(req, res) {
    const { id } = req.params;
    const { medicine_id, medicines_treatment, quantity, visit_id } = req.body;

    const oldMedicineTreatments =
      await MedicineTreatmentsServices.findMedicineById(id);

    if (!oldMedicineTreatments) {
      throw new AppError(NOT_FOUND, "Medicines not found to update", 400);
    }

    oldMedicineTreatments.medicine_id = medicine_id;
    oldMedicineTreatments.medicines_treatment = medicines_treatment;
    oldMedicineTreatments.quantity = quantity;
    oldMedicineTreatments.visit_id = visit_id;

    const newMedicines = oldMedicineTreatments.save();

    return res.json({ message: "Updated" });
  }

  static async deleteMedicineTreatments(req, res) {
    const { id } = req.params;

    const deleted = await MedicineTreatmentsServices.deleteMedicine(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete Medicine", 400);
    }

    return res.json({ message: "Medicine deleted" });
  }
}
module.exports = medicineTreatmentController;
