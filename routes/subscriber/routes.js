import express from 'express';
import { change_queue_to_active } from '../../controllers/SubscriberController.js';
const router = express.Router();


// redirect to subscriber page
router.get('/subscriber', (req, res) => {
    res.redirect('/subscriber/index');
});





router.get('/change/queue/to/active/:id' , change_queue_to_active)


export default router;