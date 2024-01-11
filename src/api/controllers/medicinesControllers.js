const MedicineService = require("../service/medicineService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class medicineController {
  static async createMedicine(req, res) {
    const { hospital_id } = req.headers;

    const medicine = await MedicineService.createMedicine({
      ...req.body,
      hospital_id: hospital_id || null,
    });

    if (!medicine) {
      throw new AppError(BAD_REQUEST, "Cannot create medicine", 400);
    }

    return res.status(CREATED).json({ medicine });
  }

  static async getAllMedicines(req, res) {
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

    const { rows, count } = await MedicineService.findAllMedicines(
      limit,
      page,
      req
    );

    if (!rows) throw new AppError(NO_CONTENT, "No medicines found", 400);

    return res.json({
      medicines: rows,
      totalPage: Math.ceil(count / limit),
      count,
    });
  }

  static async getMedicineById(req, res) {
    const { id } = req.params;
    const medicine = await MedicineService.findMedicineById(req, id);

    if (!medicine) {
      throw new AppError(NOT_FOUND, "medicine not found", 400);
    }

    return res.json({ medicine });
  }

  static async updateMedicines(req, res) {
    const { id } = req.params;
    const { hospital_id: hospital_id_requester } = req.headers;
    const { hospital_id, article_number, currency, price, in_stock } = req.body;

    const oldMedicines = await MedicineService.findMedicineById(id);

    if (!oldMedicines) {
      throw new AppError(NOT_FOUND, "Medicines not found to update", 400);
    }

    oldMedicines.hospital_id = hospital_id_requester || hospital_id;
    oldMedicines.article_number = article_number;
    oldMedicines.currency = currency;
    oldMedicines.price = price;
    oldMedicines.in_stock = in_stock;
    oldMedicines.manufacturer = manufacturer;
    oldMedicines.expiry_date = expiry_date;

    const newMedicines = oldMedicines.save();

    return res.json({ message: "Updated" });
  }

  static async deleteMedicines(req, res) {
    const { id } = req.params;

    const deleted = await MedicineService.deleteMedicine(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete Medicine", 400);
    }

    return res.json({ message: "Medicine deleted" });
  }
}
module.exports = medicineController;
