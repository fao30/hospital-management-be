const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const RolesController = require("../../controllers/rolesControllers");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");

router.post("/", tryCatch(RolesController.createRole));

router.get("/", tryCatch(RolesController.getAllRoles));

router.get("/:id", tryCatch(RolesController.getRoleById));

router.put("/:id", tryCatch(RolesController.updateRole));

router.delete("/:id", tryCatch(RolesController.deleteRole));

router.use(errorMiddleware);

module.exports = router;
