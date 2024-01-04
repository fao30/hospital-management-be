const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");
const CountriesRoutes = require("./listRoutes/countriesRoutes");
const HospitalsRoutes = require("./listRoutes/hospitalsRoutes");
const VisitsRoutes = require("./listRoutes/visitsRoutes");
const TreatmentsRoutes = require("./listRoutes/treatmentsRoutes");
const PaymentStatusesRoutes = require("./listRoutes/paymentStatusesRoutes");
const LoginRoutes = require("./registerLogin/LoginRouter");
const RegisterRoutes = require("./registerLogin/RegisterRouter");
const {
  getJwtToken,
  isSuperAdmin,
  isAdminOrManager,
} = require("../middlewares/Authorization");

router.use("/api/login", LoginRoutes);
router.use("/api/register", getJwtToken, RegisterRoutes);
router.use("/api/roles", RolesRoutes);
router.use("/api/countries", CountriesRoutes);
router.use("/api/hospitals", isSuperAdmin, HospitalsRoutes);
router.use("/api/visits", isAdminOrManager, VisitsRoutes);
router.use("/api/treatments", TreatmentsRoutes);
router.use("/api/paymentStatuses", PaymentStatusesRoutes);

router.get("/", (req, res) => {
  console.log("EEHEHEHEHEHHEE");
  res.send("Hello, world!");
});

module.exports = router;
