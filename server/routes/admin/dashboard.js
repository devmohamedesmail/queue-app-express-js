import express from 'express';
import { dashboard_app_setting, dashboard_index, dashboard_setting, dashboard_users } from '../../controllers/DashboardController.js';
const router = express.Router();



// GET /dashboard/index
router.get('/index', dashboard_index)


// GET /dashboard/users
router.get('/users', dashboard_users)


// GET /dashboard/setting
router.get('/setting', dashboard_setting)

// GET /dashboard/setting
router.get('/app/setting', dashboard_app_setting)

export default router;