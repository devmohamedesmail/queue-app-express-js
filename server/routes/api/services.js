import express from 'express';
import { fetch_place_services , get_last_queue } from '../../controllers/ServiceApiController.js';

const router = express.Router();

router.get('/place/services/:id', fetch_place_services);


// get last queue in the service
router.get('/last/queue/:place/:service?', get_last_queue);

export default router;