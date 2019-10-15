/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BookingSchema extends Schema {
  up() {
    this.create('bookings', table => {
      table.increments();
      table.date('date');
      table.boolean('approved');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('spot_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('spots');
      table.timestamps();
    });
  }

  down() {
    this.drop('bookings');
  }
}

module.exports = BookingSchema;
