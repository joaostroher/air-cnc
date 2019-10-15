const { test, trait } = use('Test/Suite')('Spots');
const path = require('path');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('it should be able to create spots', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client
    .post('/spots')
    .field('company', 'Google')
    .field('price', 62)
    .field('techs', ['React', 'Vue'])
    .attach('thumbnail', path.join(__dirname, 'assets', 'office.jpg'))
    .loginVia(user)
    .end();
  response.assertStatus(201);
  assert.exists(response.body.id);
});
