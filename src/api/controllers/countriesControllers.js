const CountriesService = require("../service/countryService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class countriesController {
  static async createCountry(req, res) {
    const { name } = req.body;
    const country = await CountriesService.createCountry(name);

    if (!country) {
      throw new AppError(BAD_REQUEST, "Cannot create country", 400);
    }

    return res.status(CREATED).json({ country });
  }
  static async getAllCountries(req, res) {
    const countries = await CountriesService.findAllCountries();

    if (countries.length === 0) {
      throw new AppError(NO_CONTENT, "countries not found", 400);
    }

    return res.status(OK).json({ countries });
  }

  static async getCountryById(req, res) {
    const { id } = req.params;
    const country = await CountriesService.findCountryById(id);

    if (!country) {
      throw new AppError(NOT_FOUND, "country not found", 400);
    }

    return res.json({ country });
  }

  static async updateCountry(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const oldCountry = await CountriesService.findCountryById(id);

    if (!oldCountry) {
      throw new AppError(NOT_FOUND, "Country not found to update", 400);
    }

    oldCountry.name = name;

    const newCOuntry = oldCountry.save();

    return res.json({ message: "Updated" });
  }

  static async deleteCountry(req, res) {
    const { id } = req.params;

    const deleted = await CountriesService.deleteCountry(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete country", 400);
    }

    return res.json({ message: "country deleted" });
  }
}
module.exports = countriesController;
