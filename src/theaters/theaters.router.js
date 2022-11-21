const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
//   .post(controller.create)
  .all(methodNotAllowed);

// router
//   .route("/:theaterId")
//   .put(controller.update)
//   .delete(controller.delete)
//   .all(methodNotAllowed);

module.exports = router;