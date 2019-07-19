import express from 'express';
import Bus from '../../controller/Bus';
import Authentication from '../../middleware/Authentication';

const router = express.Router();


// admin can add bus to database
router.post('/bus', Authentication.verifyToken, Bus.addBusForTrip);

// admin can get all bus available
router.get('/bus', Authentication.verifyToken, Bus.getAllBus);

export default router;
