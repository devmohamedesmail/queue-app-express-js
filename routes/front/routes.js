import express from 'express';
import { home_page, show_waiting_list,Book_my_turn,redirect_to_register_page ,show_user_queues} from '../../controllers/web/FrontController.js';
const router = express.Router();


router.get('' , home_page);

router.get('/register', redirect_to_register_page)

router.get('/book/queue/:placeId/:serviceId', show_waiting_list)


router.post('/book/my/turn/:place/:service?', Book_my_turn);

router.get('/show/user/queues/:userId', show_user_queues);




export default router;