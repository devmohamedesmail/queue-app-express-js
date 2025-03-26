import express from 'express';
import { fetch_setting, fetch_theme_setting } from '../../controllers/SettingApiController.js';
const router = express.Router();

router.get('/', fetch_setting);


// fetch theme color
router.get('/app/setting', fetch_theme_setting);

export default router;