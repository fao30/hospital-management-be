const { Payment_Statuses, Sequelize } = require("../models");

class PaymentStatusesService {
  static async createPayment(name) {
    return Payment_Statuses.create({ name });
  }

  static async findAllPaymentStatuses() {
    return Payment_Statuses.findAll({
      where: {
        id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findPaymentStatusById(id) {
    return Payment_Statuses.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deletePaymentStatus(id) {
    return Payment_Statuses.destroy({ where: { id } });
  }
}

module.exports = PaymentStatusesService;
