const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("movies").select("*");
}

// const myList = [1,4,5,1,2,4,5,6,7];
// const unique = [...new Set(myList)];
// function listMoviesOnce(arrayInput) {
//   return new Set(arrayInput);
// }

function listShowing() {
  // your solution here
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct();
}

function read(movieId) {
  // your solution here
  return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first();
  // .then((movies) => movies[0])
}
// {
//   "data": {
//     "id": 1,
//     "title": "Spirited Away",
//     "runtime_in_minutes": 125,
//     "rating": "PG",
//     "description": "Chihiro...",
//     "image_url": "https://imdb-api.com/..."
//   }
// }

function readTheaters(movieId) {
  // your solution here
  console.log("movieId:", movieId);
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId })
    .where({ "mt.is_showing": true });
}

// "data": [
//   {
//     "theater_id": 2,
//     "name": "Hollywood Theatre",
//     "address_line_1": "4122 NE Sandy Blvd.",
//     "address_line_2": "",
//     "city": "Portland",
//     "state": "OR",
//     "zip": "97212",
//     "created_at": "2021-02-23T20:48:13.342Z",
//     "updated_at": "2021-02-23T20:48:13.342Z",
//     "is_showing": true,
//     "movie_id": 1
//   }
// ]

// const addCategory = mapProperties({
//   critic_id: ["critic", null, "critic_id"],
//   preferred_name: ["critic", null, "preferred_name"],
//   surname: ["critic", null, "surname"],
//   organization_name: ["critic", null , "organization_name"],
// });
// const reduceTheaterAndMovies = reduceProperties("theater_id", {
//   theater_id: ["theater", "theater_id"],
//   name: ["theater", "name"],
//   movie_id: ["movies", null, "movie_id"],
//   title: ["movies", null, "title"],
//   rating: ["movies", null, "rating"],
// });

// const reduceCritic = reduceProperties("review_id", {
//   // review_id: [ "reviews", "review_id"],
//   // content: ["reviews", "content"],
//   // score: ["reviews", "score"],
//   // created_at: ["reviews", "created_at"],
//   // updated_at: ["reviews", "updated_at"],
//   // critic_id: ["reviews", "critic_id"],
//   // movie_id: ["reviews", "movie_id"],
//   critic_id: ["critic", null, "critic_id"],
//   preferred_name: ["critic", null, "preferred_name"],
//   surname: ["critic", null, "surname"],
//   organization_name: ["critic", null, "organization_name"],
//   // created_at: ["critic", null, "created_at"],
//   // updated_at: ["critic", null, "updated_at"],
// });

function mapReviewsWithCritic(reviews) {
  return reviews.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        critic_id: review.critic_id,
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    };
  });
}

// "data": [
//   {
//     "review_id": 1,
//     "content": "Lorem markdownum ...",
//     "score": 3,
//     "created_at": "2021-02-23T20:48:13.315Z",
//     "updated_at": "2021-02-23T20:48:13.315Z",
//     "critic_id": 1,
//     "movie_id": 1,
//     "critic": {
//       "critic_id": 1,
//       "preferred_name": "Chana",
//       "surname": "Gibson",
//       "organization_name": "Film Frenzy",
//       "created_at": "2021-02-23T20:48:13.308Z",
//       "updated_at": "2021-02-23T20:48:13.308Z"
//     }
//   }
//   // ...
// ]

function readReviews(movieId) {
  // your solution here
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then(mapReviewsWithCritic);
  // .then((reviews)=> reviews[0])
  // .where({"c.critic_id": "r.critic_id"})
  // .then(reduceCritic)
  // .then((reviews) => reviews[0])
}
// there are 3 copies of Critic info, there should be 1
//.then(reduceCritic[0]) will reduce it to 1 copy but not nested...
// .then(addCategory) does something different than intended
// .then((updatedReviews) => updatedReviews[0])
//.then((data) => data.critic.slice(0,1))
// .then((data) => data.critic[0])

// "data": [
//   {
//     "review_id": 1,
//     "content": "Lorem markdownum ...",
//     "score": 3,
//     "created_at": "2021-02-23T20:48:13.315Z",
//     "updated_at": "2021-02-23T20:48:13.315Z",
//     "critic_id": 1,
//     "movie_id": 1,
//     "critic": {
//       "critic_id": 1,
//       "preferred_name": "Chana",
//       "surname": "Gibson",
//       "organization_name": "Film Frenzy",
//       "created_at": "2021-02-23T20:48:13.308Z",
//       "updated_at": "2021-02-23T20:48:13.308Z"
//     }
//   }
// ...
//]

module.exports = {
  list,
  listShowing,
  read,
  readTheaters,
  readReviews,
};
