import express from 'express';
import Bookings from '../../controller/Bookings';
import Authentication from '../../middleware/Authentication';

const router = express.Router();

// book a seat in a trip
router.post('/bookings', Authentication.verifyToken, Bookings.bookAtrip);

export default router;
