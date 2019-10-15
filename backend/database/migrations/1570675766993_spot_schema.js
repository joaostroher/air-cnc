/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpotSchema extends Schema {
  up() {
    this.create('spots', table => {
      table.increments();
      table.string('thumbnail');
      table.string('company').notNullable();
      table.decimal('price', 8, 2).notNullable();
      table.json('techs');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table.timestamps();
    });
  }

  down() {
    this.drop('spots');
  }
}

module.exports = SpotSchema;
