import express from 'express';
import { getPlaces } from '../../controllers/api/PlaceApiController.js';
const router = express.Router();

router.get('/', getPlaces);

export default router;