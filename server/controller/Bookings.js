import db from '../model/Db';
import CheckForValidInput from '../helper/CheckForValidInput';
import {
  bookTripQuery, getAtripQuery, findAuserQuery, findAbusQuery, checkBookingsQuery,
  checkIfBookingExistQuery,
} from '../model/query/BookingsQuery';

class Bookings {
  /**
   * Users can book a seat for a trip
   * @param {*} req
   * @param {*} res
   */
  static async bookAtrip(req, res) {
    const { error } = CheckForValidInput.checkBooking(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    try {
      const getAuser = await db.query(findAuserQuery, [req.user.user_id]);
      const user = getAuser.rows[0];

      const { rows } = await db.query(getAtripQuery, [req.body.trip_id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Trip not found!',
        });
      }

      if (rows[0].status === 'cancelled') {
        return res.status(400).json({
          status: 'error',
          error: 'This trip has been cancelled, you can not book it',
        });
      }

      const userBookings = await db.query(checkIfBookingExistQuery,
        [rows[0].trip_id, req.user.user_id]);
      if (userBookings.rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'You already booked a seat for the trip',
        });
      }

      const bookings = await db.query(checkBookingsQuery, [rows[0].trip_id, req.body.seat_number]);
      if (bookings.rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'Seat has been occuppied, choose another seat',
        });
      }

      const bus = await db.query(findAbusQuery, [rows[0].bus_id]);
      if (bus.rows[0].capacity < req.body.seat_number) {
        return res.status(400).json({
          status: 'error',
          error: 'seat not available, choose a lower seat number',
        });
      }

      const values = [
        req.user.user_id,
        req.body.trip_id,
        new Date(),
        rows[0].bus_id,
        rows[0].trip_date,
        req.body.seat_number,
        user.first_name,
        user.last_name,
        user.email,
      ];

      const booking = await db.query(bookTripQuery, values);
      return res.status(201).json({
        status: 'success',
        data: booking.rows[0],
      });
    } catch (errors) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default Bookings;