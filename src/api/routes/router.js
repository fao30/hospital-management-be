const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");
const CountriesRoutes = require("./listRoutes/countriesRoutes");
const HospitalsRoutes = require("./listRoutes/hospitalsRoutes");
const VisitsRoutes = require("./listRoutes/visitsRoutes");
const TreatmentsRoutes = require("./listRoutes/treatmentsRoutes");
const MedicinesRoutes = require("./listRoutes/medicinesRoutes");
const MedicineTreatmentsRoutes = require("./listRoutes/medicineTreatmentsRoutes");
const PaymentStatusesRoutes = require("./listRoutes/paymentStatusesRoutes");
const LoginRoutes = require("./registerLogin/LoginRouter");
const RegisterRoutes = require("./registerLogin/RegisterRouter");
const {
  getJwtToken,
  isSuperAdmin,
  isAdminOrManager,
} = require("../middlewares/Authorization");

router.use("/login", LoginRoutes);
router.use("/register", getJwtToken, RegisterRoutes);
router.use("/roles", RolesRoutes);
router.use("/countries", CountriesRoutes);
router.use("/hospitals", isSuperAdmin, HospitalsRoutes);
router.use("/visits", isAdminOrManager, VisitsRoutes);
router.use("/treatments", TreatmentsRoutes);
router.use("/medicines", MedicinesRoutes);
router.use("/medicine-treatments", MedicineTreatmentsRoutes);
router.use("/paymentStatuses", PaymentStatusesRoutes);

module.exports = router;
