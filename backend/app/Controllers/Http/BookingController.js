const Booking = use('App/Models/Booking');

class BookingController {
  async store({ request, response, params, auth }) {
    const data = request.only(['date']);
    const booking = await Booking.create({
      ...data,
      user_id: auth.user.id,
      spot_id: params.spot_id,
    });
    return response.status(201).json(booking);
  }
}

module.exports = BookingController;
