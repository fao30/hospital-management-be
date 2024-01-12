const ListPriceService = require("../service/ListPriceService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class priceListController {
  static async createListPrices(req, res) {
    const { hospital_id } = req.headers;

    const list_price = await ListPriceService.createListPrices({
      ...req.body,
      treatment_name: req.body.treatment_name.toUpperCase(),
      hospital_id: hospital_id || null,
    });

    if (!list_price) {
      throw new AppError(BAD_REQUEST, "Cannot create list_price", 400);
    }

    return res.status(CREATED).json({ list_price });
  }

  static async findAllListPricess(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 5;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }

    const { rows, count } = await ListPriceService.findAllListPricess(
      limit,
      page,
      req
    );

    if (!rows) throw new AppError(NO_CONTENT, "No list_prices found", 400);

    return res.json({
      list_prices: rows,
      totalPage: Math.ceil(count / limit),
      count,
    });
  }

  static async findListPricesById(req, res) {
    const { id } = req.params;
    const medicine = await ListPriceService.findListPricesById(req, id);

    if (!medicine) {
      throw new AppError(NOT_FOUND, "medicine not found", 400);
    }

    return res.json({ medicine });
  }

  static async updateListPricesById(req, res) {
    const { id } = req.params;
    const { hospital_id: hospital_id_requester } = req.headers;
    const { hospital_id, treatment_name, currency } = req.body;

    const oldpricelist = await ListPriceService.findListPricesById(id);

    if (!oldpricelist) {
      throw new AppError(NOT_FOUND, "Medicines not found to update", 400);
    }

    oldpricelist.hospital_id = hospital_id_requester || hospital_id;
    oldpricelist.treatment_name = treatment_name;
    oldpricelist.currency = currency;
    oldpricelist.price = price;
    oldpricelist.in_stock = in_stock;

    const newMedicines = oldpricelist.save();

    return res.json({ message: "Updated" });
  }

  static async deleteListPrices(req, res) {
    const { id } = req.params;

    const deleted = await ListPriceService.deleteListPrices(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete pricelist", 400);
    }

    return res.json({ message: "pricelist deleted" });
  }
}
module.exports = priceListController;
