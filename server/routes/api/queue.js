import express from 'express';
import { bookQueue } from '../../controllers/QueueApiController.js';
const router = express.Router();

router.post('/book/new/queue', bookQueue);

export default router;