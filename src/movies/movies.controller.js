const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res, next) {
  // your solution here
  const isShowing = req.query.is_showing;
  if (isShowing == "true") {
    res.json({ data: await service.listShowing() });
  } else {
    res.json({ data: await service.list() });
  }
  // isShowing == true ? await service.listShowing() : await service.list();
}

async function read(req, res, next) {
  //   const knexInstance = req.app.get("db");
  // const movie = res.locals.movie;
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  res.json({ data: movie });
}

async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  const movieTheaters = await service.readTheaters(movieId);
  res.json({ data: movieTheaters });
}

async function readReviews(req, res, next) {
  const { movieId } = req.params;
  const movieReviews = await service.readReviews(movieId);
  res.json({ data: movieReviews });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
