const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(controller.readTheaters)
  .all(methodNotAllowed);
  
router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(methodNotAllowed);

//   - `GET /movies/:movieId`
// - `GET /movies/:movieId` (incorrect ID)
// - `GET /movies/:movieId/theaters`
// - `GET /movies/:movieId/reviews`

module.exports = router;