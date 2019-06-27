import express from 'express';
import User from '../../controller/User';

const router = express.Router();

// user signup route
router.post('/signup', User.createUser);

// user signin route
router.post('/signin', User.loginUser);

export default router;
