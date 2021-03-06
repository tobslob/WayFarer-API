import db from '../model/Db';
import CheckForValidInput from '../helper/CheckForValidInput';
import {
  bookTripQuery, getAtripQuery, findAuserQuery, findAbusQuery, checkBookingsQuery,
  checkIfBookingExistQuery, getAllBookingsUserQuery, getAllBookingsAdminQuery,
  deleteBookingQuery, updateBookingQuery,
} from '../model/query/BookingsQuery';


let seat_number;


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

      if (rows[0].status === 'canceled') {
        return res.status(400).json({
          status: 'error',
          error: 'This trip has been canceled, you can not book it',
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

      const bookings = await db.query(checkBookingsQuery, [rows[0].trip_id, seat_number]);
      if (bookings.rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'Seat has been occuppied, choose another seat',
        });
      }

      const bus = await db.query(findAbusQuery, [rows[0].bus_id]);
      if (bus.rows[0].capacity < seat_number) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid seat number',
        });
      }

      if (!req.body.seat_number) {
        seat_number = Math.floor(Math.random() * (bus.rows[0].capacity - 1) + 1);
      } else {
        // eslint-disable-next-line prefer-destructuring
        seat_number = req.body.seat_number;
      }

      const values = [
        req.user.user_id,
        req.body.trip_id,
        new Date(),
        rows[0].bus_id,
        rows[0].trip_date,
        seat_number,
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


  /**
   * Admin can get all bookings and user can get
   * his/her bookings only
 *@param {req} object
 *@param {res} object
 */
  static async getAllBookings(req, res) {
    try {
      if (req.user.is_admin) {
        const { rows } = await db.query(getAllBookingsAdminQuery);
        if (!rows[0]) {
          return res.status(404).json({
            status: 'error',
            error: 'Not found',
          });
        }
        return res.status(200).json({
          status: 'success',
          data: rows,
        });
      }
      const { rows } = await db.query(getAllBookingsUserQuery, [req.user.email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }

  /**
 * User can delete their bookings
 * @param {*} req
 * @param {*} res
 */
  static async deleteBooking(req, res) {
    const { error } = CheckForValidInput.checkBookParams(req.params);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    try {
      const { rows } = await db.query(deleteBookingQuery,
        [req.params.booking_id, req.user.user_id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Not Found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Deleted successfully',
        },
      });
    } catch (errors) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
       * users can change seat number after booking
       * @param {*} req
       * @param {*} res
       */
  static async changeSeat(req, res) {
    const { error } = CheckForValidInput.checkBooking(req.body)
      && CheckForValidInput.checkBookParams(req.params);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    if (!req.body.seat_number) {
      seat_number = Math.floor(Math.random() * (18 - 1) + 1);
    } else {
      // eslint-disable-next-line prefer-destructuring
      seat_number = req.body.seat_number;
    }

    const values = [
      seat_number,
      req.user.email,
      req.user.user_id,
      req.params.booking_id,
    ];
    try {
      const bookings = await db.query(checkBookingsQuery,
        [req.body.trip_id, seat_number]);
      if (bookings.rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'Seat has been occuppied, choose another seat',
        });
      }

      const trip = await db.query(getAtripQuery, [req.body.trip_id]);
      if (trip.rows[0].length <= 0) {
        return res.status(404).json({
          status: 'error',
          error: 'No trip found!',
        });
      }

      const bus = await db.query(findAbusQuery, [trip.rows[0].bus_id]);
      if (bus.rows[0].capacity < seat_number) {
        return res.status(400).json({
          status: 'error',
          error: 'seat not available, choose a lower seat number',
        });
      }

      const userBooking = await db.query(updateBookingQuery, values);
      if (!userBooking.rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'Not Found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: userBooking.rows[0],
      });
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default Bookings;
