import express from 'express';
import { bookQueue, 
    cancel_queue, 
    get_all_queue_waiting_in_service, 
    get_all_users_queues_today, 
    get_first_active_queue_in_service, 
    get_last_queue, 
    move_queue_to_back,
    get_all_user_queues_history,
    subscriber_active_queue

 } from '../../controllers/api/QueueApiController.js';
const router = express.Router();

router.post('/book/new/queue/:user/:place/:service?', bookQueue);


// get last queue in the service
router.get('/last/queue/:user/:place/:service?', get_last_queue);


// get all queue in the service and place
router.get('/all/queue/:place/:service?', get_all_queue_waiting_in_service);


// get first active queue in the service
router.get('/first/active/queue/:place/:service?', get_first_active_queue_in_service);


// cancel queue
router.get('/cancel/queue/:id', cancel_queue);
// change the queue to active

router.get('/active/queue/:queueId/:userId', subscriber_active_queue );

// move my queue to back 
// router.get('/move/queue/:id/:place?/:service?/:number?', move_queue_to_back);
router.get('/move/queue/:queueId', move_queue_to_back);

// get all user queues according day
router.get('/user/queues/:id', get_all_users_queues_today);

// get all queues of the user for history
router.get('/user/queues/history/:id', get_all_user_queues_history);







export default router;