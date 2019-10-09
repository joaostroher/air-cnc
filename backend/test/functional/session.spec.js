const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should be return JWT token when session created', async ({
  assert,
  client,
}) => {
  const payload = {
    password: '123456',
  };

  const user = await Factory.model('App/Models/User').create(payload);

  const response = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: payload.password,
    })
    .end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});
