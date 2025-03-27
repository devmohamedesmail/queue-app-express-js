import express from 'express';
import { bookQueue } from '../../controllers/QueueApiController.js';
const router = express.Router();

router.post('/book/new/queue/:place/:service?', bookQueue);

export default router;