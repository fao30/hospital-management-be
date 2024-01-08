const UserService = require("../service/userService");
const HospitalService = require("../service/hospitalService");
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
    const hospital_id = req?.headers?.hospital_id || null;
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);
    const show_hospital = Number.parseInt(req.query.show_hospital || false);
    let hospital = null;
    let totalUsers = null;

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 5;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }

    const { rows, count } = await UserService.findAllUsers(limit, page, req);

    if (hospital_id) {
      hospital = await HospitalService.findHospitalById(
        req.headers.hospital_id
      );
      totalUsers = await UserService.countUsersOverall(req);
    }

    if (!rows) throw new AppError(NO_CONTENT, "No schedules found", 400);

    return res.json({
      users: rows,
      totalPage: Math.ceil(count / limit),
      count,
      hospital: hospital_id ? hospital : null,
      total_users: hospital_id ? totalUsers : null,
    });
  }
}
module.exports = usersController;
