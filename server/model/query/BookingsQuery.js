const bookTripQuery = `INSERT INTO 
bookings (user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      returning booking_id, user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email`;

const getAtripQuery = 'SELECT * FROM trip WHERE trip_id = $1';

const getAllBookingQuery = 'SELECT * FROM bookings';

const findAuserQuery = 'SELECT * FROM users WHERE user_id = $1';

const findAbusQuery = 'SELECT * FROM bus WHERE bus_id = $1';

const checkBookingsQuery = 'SELECT * FROM bookings WHERE (trip_id = $1 and seat_number = $2)';

const checkIfBookingExistQuery = 'SELECT * FROM bookings WHERE (trip_id = $1 and user_id = $2)';

export {
  bookTripQuery,
  getAtripQuery,
  getAllBookingQuery,
  findAuserQuery,
  findAbusQuery,
  checkBookingsQuery,
  checkIfBookingExistQuery,
};
