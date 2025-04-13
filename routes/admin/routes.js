import express from 'express';
import { dashboard_index,dashboard_places ,dashboard_users,dashboard_setting,dashboard_app_setting} from '../../controllers/web/AdminController.js';
import { protect } from '../../middlewares/authMiddleware.js';
const router = express.Router();


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
