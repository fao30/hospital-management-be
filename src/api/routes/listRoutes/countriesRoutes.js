const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const CountriesControllers = require("../../controllers/countriesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");

router.post("/", tryCatch(CountriesControllers.createCountry));

router.get("/", tryCatch(CountriesControllers.getAllCountries));

router.get("/:id", tryCatch(CountriesControllers.getCountryById));

router.put("/:id", tryCatch(CountriesControllers.updateCountry));

router.delete("/:id", tryCatch(CountriesControllers.deleteCountry));

router.use(errorMiddleware);

module.exports = router;
