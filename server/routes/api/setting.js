import express from 'express';
import { fetch_setting } from '../../controllers/SettingApiController.js';
const router = express.Router();

router.get('/', fetch_setting );

export default router;