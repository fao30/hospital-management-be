const UserService = require("../service/userService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");
const { SUPER_ADMIN } = require("../constants/roles.const");

class usersController {
  static async getAllUsers(req, res) {
    const role_id_search = JSON.parse(req.query.role_id || false);
    const { hospital_id, role_id } = req.headers;

    let where = {};
    if (role_id !== SUPER_ADMIN) {
      where.hospital_id = hospital_id;
    }
    if (role_id_search) {
      where.role_id = role_id_search;
    }

    const users = await UserService.findUserQuery(where);

    if (!users.length) {
      throw new AppError(NO_CONTENT, "users not found", 400);
    }

    return res.status(OK).json({ users });
  }
}
module.exports = usersController;
