exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id");
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table.integer("theater_id");
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("cascade");
    table.boolean("is_showing");
  });
};

// return knex.schema.createTable("critics", (table) => {
//     table.increments("critic_id").primary();
//     table.string("preferred_name");
//     table.string("surname");
//     table.string("organization_name");
//     table.timestamps(true, true);
// });
// {
//     "movie_id": 1,
//     "theater_id": 3,
//     "is_showing": false
//   }

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
