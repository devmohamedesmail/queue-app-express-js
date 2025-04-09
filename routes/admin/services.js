import express from 'express';
import { addNewService, delete_service } from '../../controllers/web/ServiceController.js';
const router = express.Router();



router.post('/add/new/service/:id', addNewService)


// Delete Existing Service
router.get('/delete/service/:id', delete_service)



export default router;