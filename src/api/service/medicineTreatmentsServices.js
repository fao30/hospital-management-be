const { BAD_REQUEST } = require("../constants/statusCode");
const AppError = require("../helpers/AppError");
const { Medicines_Treatments, Medicines, sequelize } = require("../models");

class medicineTreatmentsService {
  static async createMedicineTreatment(query) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const resp_medicine = await Medicines.findOne({
        where: { id: query.medicine_id },
        transaction,
      });

      const newStockAmount = resp_medicine.in_stock - query.quantity;
      if (newStockAmount < 0) {
        throw new AppError(BAD_REQUEST, "Medicine is not enough", 400);
      }

      const resp = await Medicines_Treatments.create(query, { transaction });

      await Medicines.update(
        { in_stock: newStockAmount },
        {
          where: { id: query.medicine_id },
          transaction,
        }
      );

      await transaction.commit();

      return resp;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  static async findAllMedicineTreatments() {
    return Medicines_Treatments.findAll({
      where: {
        // id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findMedicineTreatmentById(id) {
    return Medicines_Treatments.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteMedicineTreatment(id) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const oldMedicineTreatments = await Medicines_Treatments.findOne({
        where: { id },
        include: [
          {
            model: Medicines,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        transaction,
      });

      const oldMedicine = await Medicines.findOne({
        where: { id: oldMedicineTreatments?.Medicine?.id },
        transaction,
      });

      const deleteRes = await Medicines_Treatments.destroy({
        where: { id },
        transaction,
      });

      if (!deleteRes) {
        throw new AppError(BAD_REQUEST, "Cannot delete Medicine", 400);
      }

      oldMedicine.in_stock =
        oldMedicine.in_stock + oldMedicineTreatments.quantity;
      await oldMedicine.save({ transaction });

      await transaction.commit();

      return true;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
}

module.exports = medicineTreatmentsService;
