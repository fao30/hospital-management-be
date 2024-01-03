const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");
const CountriesRoutes = require("./listRoutes/countriesRoutes");
const PaymentStatusesRoutes = require("./listRoutes/paymentStatusesRoutes");
const LoginRoutes = require("./registerLogin/LoginRouter");
const RegisterRoutes = require("./registerLogin/RegisterRouter");

router.use("/api/login", LoginRoutes);
router.use("/api/register", RegisterRoutes);
router.use("/api/roles", RolesRoutes);
router.use("/api/countries", CountriesRoutes);
router.use("/api/paymentStatuses", PaymentStatusesRoutes);

router.get("/", (req, res) => {
  console.log("EEHEHEHEHEHHEE");
  res.send("Hello, world!");
});

module.exports = router;
