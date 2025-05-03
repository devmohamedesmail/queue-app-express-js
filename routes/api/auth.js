import express from 'express';
import { register_user ,login_user , edit_user } from '../../controllers/api/AuthApiController.js';
const router = express.Router();


// Register User
router.post('/register', register_user )

// Login User
router.post('/login', login_user );

// Edit user
router.post('/edit/user/:userId', edit_user )



export default router;