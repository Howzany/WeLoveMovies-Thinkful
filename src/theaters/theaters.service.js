const { Statement } = require("sqlite3");
const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// const addCategory = mapProperties({
//   movie_id: "movie.movie_id",
//   title: "movie.title",
//   runtime_in_minutes: "movie.runtime_in_minutes",
//   rating: "movie.rating",
//   description: "movie.description",
//   image_url: "movie.image_url",
//   created_at: "movie.created_at",
//   updated_at: "movie.updated_at",
// });

const reduceTheaterAndMovies = reduceProperties("theater_id", {
  // theater_id: ["theater", "theater_id"],
  // name: ["theater", "name"],
  // address_line_1: ["theater", "address_line_1"],
  // address_line_2: ["theater", "address_line_2"],
  // city: ["theater", "city"],
  // state: ["theater", "state"],
  // zip: ["theater", "zip"],
  // created_at: ["theater", "create_at"],
  // updated_at: ["theater", "updated_at"],
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
});
// ASK TA WHETHER I NEED TO USE reduce-properties.js
// I THINK I DON'T NEED TO USE REDUCE SINCE I NEED ALL MOVIE
// PROPERTIES, AND MY .where IS HANDLING THE {is_showing: true}

function list() {
  return (
    knex("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .join("movies as m", "m.movie_id", "mt.movie_id")
      .select("t.*", "m.*", "mt.is_showing")
      .where({ is_showing: true })
      // .first()
      .then(reduceTheaterAndMovies)
  );
}

// {
//     "data": [
//       {
//         "theater_id": 1,
//         "name": "Regal City Center",
//         "address_line_1": "801 C St.",
//         "address_line_2": "",
//         "city": "Vancouver",
//         "state": "WA",
//         "zip": "98660",
//         "created_at": "2021-02-23T20:48:13.335Z",
//         "updated_at": "2021-02-23T20:48:13.335Z",
//         "movies": [
//           {
//             "movie_id": 1,
//             "title": "Spirited Away",
//             "runtime_in_minutes": 125,
//             "rating": "PG",
//             "description": "Chihiro...",
//             "image_url": "https://imdb-api.com...",
//             "created_at": "2021-02-23T20:48:13.342Z",
//             "updated_at": "2021-02-23T20:48:13.342Z",
//             "is_showing": false,
//             "theater_id": 1
//           }
//           // ...
//         ]
//       }
//       // ...
//     ]
//   }

module.exports = {
  list,
};
