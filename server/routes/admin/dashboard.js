import express from 'express';
import { dashboard_app_setting, dashboard_index, dashboard_places, dashboard_setting, dashboard_users } from '../../controllers/DashboardController.js';
const router = express.Router();

import { protect } from '../../middlewares/authMiddleware.js';

// GET /dashboard/index
router.get('/index', dashboard_index)



// GET /dashboard/place
router.get('/places' ,dashboard_places)


// GET /dashboard/users
router.get('/users', protect ,dashboard_users)


// GET /dashboard/setting
router.get('/setting',protect ,dashboard_setting)

// GET /dashboard/setting
router.get('/app/setting',protect, dashboard_app_setting)

export default router;