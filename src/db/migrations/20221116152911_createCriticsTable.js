exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary();
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true);
  });
};

// - `critic_id`: (Primary Key) A unique ID for the critic.
// - `preferred_name`: (String) The critic's preferred first name.
// - `surname`: (String) The critic's last name.
// - `organization_name`: (String) The name of the organization the critic works for.
// exports.up = function (knex) {
//     return knex.schema.createTable("suppliers", (table) => {
//       table.increments("supplier_id").primary(); // Sets supplier_id as the primary key
//       table.string("supplier_name");
//       table.string("supplier_address_line_1");
//       table.string("supplier_address_line_2");
//       table.string("supplier_city");
//       table.string("supplier_state");
//       table.string("supplier_zip");
//       table.string("supplier_phone");
//       table.string("supplier_email");
//       table.text("supplier_notes");
//       table.string("supplier_type_of_goods");
//       table.timestamps(true, true); // Adds created_at and updated_at columns
//     });
//   };

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
