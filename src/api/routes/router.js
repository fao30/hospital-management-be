const router = require("express").Router();
const RolesRoutes = require("./listRoutes/rolesRoutes");

router.use("/api/roles", RolesRoutes);

router.get("/", (req, res) => {
  console.log("EEHEHEHEHEHHEE");
  res.send("Hello, world!");
});

module.exports = router;
