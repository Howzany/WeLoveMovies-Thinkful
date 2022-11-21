const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res) {
  // your solution here
  // 35.10
  // {
  //   "score": 3,
  //   "content": "New content..."
  // } must update these two items inside it
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
   await service.update(updatedReview)
  const data = await service.readReviewWithCritic(updatedReview.review_id)
  // console.log(res.locals.review);
  // const {score, content} = res.locals.review;
  res.json({ data: data });
}


// async function update(req, res) {

//   const updatedSupplier = {

//     ...req.body.data,

//     supplier_id: res.locals.supplier.supplier_id,

//   };

//   const data = await suppliersService.update(updatedSupplier);

//   res.json({ data });

//}
// function update(req, res, next) {

//   const updatedSupplier = {

//     ...req.body.data,

//     supplier_id: res.locals.supplier.supplier_id,

//   };

//   suppliersService

//     .update(updatedSupplier)

//     .then((data) => res.json({ data }))

//     .catch(next);

// }

// A body like the following should be passed along with the request:

// ```json
// {
//   "score": 3,
//   "content": "New content..."
// }
// ```

async function destroy(req, res) {
  // your solution here
  
  res
    .status(204)
    .json({ data: await service.delete(res.locals.review.review_id) });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
