const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");
const CountriesRoutes = require("./listRoutes/countriesRoutes");
const HospitalsRoutes = require("./listRoutes/hospitalsRoutes");
const SchedulesRoutes = require("./listRoutes/schedulesRoutes");
const VisitsRoutes = require("./listRoutes/visitsRoutes");
const TreatmentsRoutes = require("./listRoutes/treatmentsRoutes");
const MedicinesRoutes = require("./listRoutes/medicinesRoutes");
const MedicineTreatmentsRoutes = require("./listRoutes/medicineTreatmentsRoutes");
const PriceListsRoutes = require("./listRoutes/priceListsRoutes");
const PaymentStatusesRoutes = require("./listRoutes/paymentStatusesRoutes");
const SearchRoutes = require("./listRoutes/searchRoutes");
const UsersRoutes = require("./listRoutes/usersRoutes");
const LoginRoutes = require("./registerLogin/LoginRouter");
const RegisterRoutes = require("./registerLogin/RegisterRouter");
const {
  getJwtToken,
  isSuperAdmin,
  isAdminOrManager,
  isDoctorOrAdminOrManager,
} = require("../middlewares/Authorization");

router.use((req, res, next) => {
  const globalIo = req.app.get("socketio"); // Get io from the global level
  req.io = globalIo; // Pass io to the request object
  next();
});

router.use("/login", LoginRoutes);
router.use("/register", getJwtToken, RegisterRoutes);
router.use("/roles", RolesRoutes);
router.use("/countries", CountriesRoutes);
router.use("/hospitals", isSuperAdmin, HospitalsRoutes);
router.use("/visits", isDoctorOrAdminOrManager, VisitsRoutes);
router.use("/schedules", isDoctorOrAdminOrManager, SchedulesRoutes);
router.use("/treatments", TreatmentsRoutes);
router.use("/medicines", MedicinesRoutes);
router.use("/list-prices", PriceListsRoutes);
router.use("/medicine-treatments", MedicineTreatmentsRoutes);
router.use("/paymentStatuses", PaymentStatusesRoutes);
router.use("/users", UsersRoutes);
router.use("/search", SearchRoutes);

module.exports = router;
