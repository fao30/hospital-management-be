const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("EEHEHEHEHEHHEE");
  res.send("Hello, world!");
});

module.exports = router;
