import express from 'express';
import { fetch_place_services } from '../../controllers/ServiceApiController.js';

const router = express.Router();

router.get('/place/services/:id', fetch_place_services);

export default router;