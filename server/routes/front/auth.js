import express from 'express';
import { register_user ,login_user } from '../../controllers/AuthController.js';
const router = express.Router();

// Register User
router.post('/register', register_user);
// Login User
router.post('/login', login_user);



export default router;