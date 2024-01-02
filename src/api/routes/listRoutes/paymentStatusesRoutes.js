const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const PaymentStatusesControllers = require("../../controllers/paymentStatusesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");

router.post("/", tryCatch(PaymentStatusesControllers.createPayment));

router.get("/", tryCatch(PaymentStatusesControllers.getAllpaymentStatuses));

router.get("/:id", tryCatch(PaymentStatusesControllers.getPaymentStatusById));

router.put("/:id", tryCatch(PaymentStatusesControllers.updatePaymentStatuses));

router.delete("/:id", tryCatch(PaymentStatusesControllers.deletePaymentStatus));

router.use(errorMiddleware);

module.exports = router;
