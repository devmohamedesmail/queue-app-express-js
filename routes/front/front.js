import express from 'express';
import { redirect_login_page } from '../../controllers/web/FrontController.js';

const router = express.Router();


// redirect to login page
router.get('/login/page', redirect_login_page )

export default router;