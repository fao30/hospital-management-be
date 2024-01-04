const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");
const CountriesRoutes = require("./listRoutes/countriesRoutes");
const PaymentStatusesRoutes = require("./listRoutes/paymentStatusesRoutes");
const LoginRoutes = require("./registerLogin/LoginRouter");
const RegisterRoutes = require("./registerLogin/RegisterRouter");
const { getJwtToken } = require("../middlewares/Authorization");

router.use("/login", LoginRoutes);
router.use("/register", getJwtToken, RegisterRoutes);
router.use("/roles", RolesRoutes);
router.use("/countries", CountriesRoutes);
router.use("/paymentStatuses", PaymentStatusesRoutes);

module.exports = router;
