const UserService = require("../service/userService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class usersController {
  static async getAllUsers(req, res) {
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

    const { rows, count } = await UserService.findAllUsers(limit, page, req);

    if (!rows) throw new AppError(NO_CONTENT, "No schedules found", 400);

    return res.json({
      users: rows,
      totalPage: Math.ceil(count / limit),
    });
  }
}
module.exports = usersController;
