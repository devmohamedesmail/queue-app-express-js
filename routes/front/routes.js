import express from 'express';
import { home_page, show_waiting_list,Book_my_turn,redirect_to_register_page } from '../../controllers/web/FrontController.js';
const router = express.Router();


router.get('' , home_page);

router.get('/register', redirect_to_register_page)

router.get('/book/queue/:place/:service', show_waiting_list)


router.post('/book/my/turn/:place/:service', Book_my_turn);




export default router;