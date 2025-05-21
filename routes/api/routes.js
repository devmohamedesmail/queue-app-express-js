import express from 'express';
import { fetch_queues_for_employee, fetch_queues_for_place, send_help ,show_help_replies ,show_users} from '../../controllers/api/api_controller.js';
const router = express.Router();





// Help routes
router.post('/send/help', send_help);
// show help message for user
router.get('/show/help/replies/:userId', show_help_replies);




// *************************** users routes ******************************
router.get('/users', show_users); 





// fetch_queues_for_place

router.get('/fetch/queues/place/:placeId', fetch_queues_for_place);

// fetch the queues which the emplyee do it 
router.get('/fetch/queues/employee/:employeeId', fetch_queues_for_employee)







export default router;