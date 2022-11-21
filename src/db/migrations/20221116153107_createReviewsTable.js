
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table)=>{
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    table.integer("movie_id");
    table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("cascade");
    table.integer("critic_id");
    table
        .foreign("critic_id")
        .references("critic_id")
        .inTable("critics")
        .onDelete("cascade");
    table.timestamps(true, true);
  });
};
// {
//     "review_id": 1,
//     "content": "...",
//     "score": 4,
//     "movie_id": 1,
//     "critic_id": 4,
//     "created_at": "2021-02-23T20:48:13.315Z",
//     "updated_at": "2021-02-23T20:48:13.315Z"
//   }

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};
