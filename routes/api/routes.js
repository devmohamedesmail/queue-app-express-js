import express from 'express';
import { send_help ,show_help_replies} from '../../controllers/api/api_controller.js';
const router = express.Router();





// Help routes
router.post('/send/help', send_help);
// show help message for user
router.get('/show/help/replies/:userId', show_help_replies);

export default router;