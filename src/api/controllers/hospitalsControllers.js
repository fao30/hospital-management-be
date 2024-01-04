const HospitalsService = require("../service/hospitalService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class hospitalsController {
  static async createHospital(req, res) {
    const hospital = await HospitalsService.createHospital(req.body);

    if (!hospital) {
      throw new AppError(BAD_REQUEST, "Cannot create hospital", 400);
    }

    return res.status(CREATED).json({ hospital });
  }

  static async getAllHospitals(req, res) {
    const hospitals = await HospitalsService.findAllHospitals();

    if (!hospitals.length) {
      throw new AppError(NO_CONTENT, "hospitals not found", 400);
    }

    return res.status(OK).json({ hospitals });
  }

  static async getHospitalById(req, res) {
    const { id } = req.params;
    const hospital = await HospitalsService.findHospitalById(id);

    if (!hospital) {
      throw new AppError(NOT_FOUND, "hospital not found", 400);
    }

    return res.json({ hospital });
  }

  static async updateHospital(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const oldHospital = await HospitalsService.findHospitalById(id);

    if (!oldHospital) {
      throw new AppError(NOT_FOUND, "Hospital not found to update", 400);
    }

    oldHospital.name = name;
    oldHospital.address = address;
    oldHospital.phone_number = phone_number;
    oldHospital.is_active = is_active;
    oldHospital.max_users = max_users;

    const newHospital = oldHospital.save();

    return res.json({ message: "Updated" });
  }

  static async deleteHospital(req, res) {
    const { id } = req.params;

    const deleted = await HospitalsService.deleteHospital(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete hospital", 400);
    }

    return res.json({ message: "hospital deleted" });
  }
}
module.exports = hospitalsController;
