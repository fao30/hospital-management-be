const SearchService = require("../service/searchService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class searchController {
  static async searchUserByKeywords(req, res) {
    const search = await SearchService.searchUserByKeywords(req);

    if (!search.length) {
      throw new AppError(NO_CONTENT, "search not found", 400);
    }

    return res.status(OK).json({ search });
  }
  static async searchMedicineByKeywords(req, res) {
    const search = await SearchService.searchMedicineByKeywords(req);

    if (!search.length) {
      throw new AppError(NO_CONTENT, "search not found", 400);
    }

    return res.status(OK).json({ search });
  }

  static async searchPriceListByKeywords(req, res) {
    const search = await SearchService.searchPriceListByKeywords(req);

    if (!search.length) {
      throw new AppError(NO_CONTENT, "search not found", 400);
    }

    return res.status(OK).json({ search });
  }
}
module.exports = searchController;
