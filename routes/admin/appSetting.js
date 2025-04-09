import express from 'express';
import { update_app_setting } from '../../controllers/web/AppSettingController.js';

const router = express.Router();



router.post('/update', update_app_setting)




export default router;