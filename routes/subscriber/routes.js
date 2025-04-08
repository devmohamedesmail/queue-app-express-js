import express from 'express';
import { change_queue_to_active } from '../../controllers/SubscriberController.js';
const router = express.Router();

import { redirect_to_index, redirect_to_statistics, redirect_to_users, create_new_user_for_place ,redirect_to_setting, redirect_to_queues} from '../../controllers/Subscriber/SubscriberController.js';


// redirect to subscriber page
router.get('/index', redirect_to_index);

// show statistics page
router.get('/statistics/:id',redirect_to_statistics);


// show users page
router.get('/users/:id', redirect_to_users);


// create new user for place 
router.post('/create/new/user/:placeId' , create_new_user_for_place);


// redirect to setting page
router.get('/setting/:placeId', redirect_to_setting);



// redirect to queues page
router.get('/queues/:placeId', redirect_to_queues );














router.get('/change/queue/to/active/:id', change_queue_to_active)


export default router;