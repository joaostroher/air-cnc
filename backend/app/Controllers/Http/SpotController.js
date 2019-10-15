const Spot = use('App/Models/Spot');
const Helpers = use('Helpers');
const path = use('path');

class SpotController {
  async index() {
    const spots = await Spot.all();
    return spots.toJSON();
  }

  async store({ request, response, auth }) {
    const data = request.only(['company', 'price', 'techs']);
    let thumbnail = null;
    const file = request.file('thumbnail', {
      types: ['image'],
      size: '2mb',
    });

    if (file) {
      const ext = path.extname(file.clientName);
      const name = path.basename(file.clientName, ext);

      thumbnail = `${name}-${Date.now()}${ext}`;

      await file.move(Helpers.tmpPath('uploads'), {
        name: thumbnail,
      });
    }

    const spot = await Spot.create({
      ...data,
      user_id: auth.user.id,
      thumbnail,
    });
    return response.status(201).json(spot);
  }
}

module.exports = SpotController;
