

import express from 'express';
import { update_setting } from '../../controllers/web/SettingController.js';
const router = express.Router();
import multer from 'multer';
import path from 'path'
import fs from 'fs';

// multer
// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Ensure the 'uploads' directory exists
const uploadDirectory = './public/uploads/';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const upload = multer({ storage: storage });








router.post('/update',upload.single('image') ,update_setting);

export default router;