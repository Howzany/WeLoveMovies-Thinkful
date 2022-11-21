const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

function read(reviewId) {
  // your solution here
  return knex("reviews as r")
    .select("r.*")
    .where({ review_id: reviewId })
    .first();
}

// const addCategory = mapProperties({
//   critic_id: "critic.critic_id",
//   preferred_name: "critic.preferred_name",
//   surname: "critic.surname",
//   organization_name: "critic.organization_name",
//   created_at: "critic.created_at",
//   updated_at: "critic.updated_at",
// });
// {
// "data": {
//   "review_id": 1,
//   "content": "New content...",
//   "score": 3,
//   "created_at": "2021-02-23T20:48:13.315Z",
//   "updated_at": "2021-02-23T20:48:13.315Z",
//   "critic_id": 1,
//   "movie_id": 1,
//   "critic": {
//     "critic_id": 1,
//     "preferred_name": "Chana",
//     "surname": "Gibson",
//     "organization_name": "Film Frenzy",
//     "created_at": "2021-02-23T20:48:13.308Z",
//     "updated_at": "2021-02-23T20:48:13.308Z"
//   }
// }
// }

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

function update(updatedReview) {
  console.log("updatedReview From Service:", updatedReview);
  //your solution here
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .update({ content: updatedReview.content, score: updatedReview.score }, "*")
    .then((updatedReviews) => {
      console.log("updated REVIEWS HERE: ", updatedReviews);
      return updatedReviews[0];
    });
  // .then(addCategory);
  // .then(reduceCritic)
}

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

function readReviewWithCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.review_id": reviewId })
    .then(mapReviewsWithCritic)
    .then((reviews)=> reviews[0]);
}
// function update(updatedReview) {

//   return knex("reviews")

//     .select("*")

//     .where({ review_id: updatedReview.review_id })

//     .update(updatedReview, "*");

// }
//

function destroy(reviewId) {
  //your solution here
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  readReviewWithCritic,
  update,
  delete: destroy,
};
