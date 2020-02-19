exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .text('username', 128)
        .unique()
        .notNullable();
    })
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('contents');

      // Foreign Key
      tbl
        .integer('user_id') // the foreign key must be the same type as the primary key it references
        .unsigned() // always include .unsigned() when referencing an integer primary key
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts').dropTableIfExists('users');
};
