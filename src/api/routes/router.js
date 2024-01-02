const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");
const CountriesRoutes = require("./listRoutes/countriesRoutes");
const PaymentStatusesRoutes = require("./listRoutes/countriesRoutes");

router.use("/api/roles", RolesRoutes);
router.use("/api/countries", CountriesRoutes);
router.use("/api/paymentStatuses", PaymentStatusesRoutes);

router.get("/", (req, res) => {
  console.log("EEHEHEHEHEHHEE");
  res.send("Hello, world!");
});

module.exports = router;
