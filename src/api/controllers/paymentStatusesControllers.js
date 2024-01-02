const PaymentStatusesService = require("../service/paymentStatusesService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class paymentStatusesController {
  static async createPayment(req, res) {
    const { name } = req.body;
    const paymeny_statuses = await PaymentStatusesService.createPayment(name);

    if (!paymeny_statuses) {
      throw new AppError(BAD_REQUEST, "Cannot create paymeny_statuses", 400);
    }

    return res.status(CREATED).json({ paymeny_statuses });
  }
  static async getAllpaymentStatuses(req, res) {
    const payment_statuses =
      await PaymentStatusesService.findAllPaymentStatuses();

    if (payment_statuses.length === 0) {
      throw new AppError(NO_CONTENT, "payment_statuses not found", 400);
    }

    return res.status(OK).json({ payment_statuses });
  }

  static async getPaymentStatusById(req, res) {
    const { id } = req.params;
    const payment_statuses = await PaymentStatusesService.findPaymentStatusById(
      id
    );

    if (!payment_statuses) {
      throw new AppError(NOT_FOUND, "payment_statuses not found", 400);
    }

    return res.json({ payment_statuses });
  }

  static async updatePaymentStatuses(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const oldPaymentStatus = await PaymentStatusesService.findPaymentStatusById(
      id
    );

    if (!oldPaymentStatus) {
      throw new AppError(NOT_FOUND, "Country not found to update", 400);
    }

    oldPaymentStatus.name = name;

    const newPaymentStatus = oldPaymentStatus.save();

    return res.json({ message: "Updated" });
  }

  static async deletePaymentStatus(req, res) {
    const { id } = req.params;

    const deleted = await PaymentStatusesService.deletePaymentStatus(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete payment status", 400);
    }

    return res.json({ message: "payment status deleted" });
  }
}
module.exports = paymentStatusesController;
