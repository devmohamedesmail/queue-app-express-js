import express from 'express';
import { fetch_places_with_services , add_new_place, update_place } from '../../controllers/api/PlaceApiController.js';
import multer from 'multer';
import path from 'path'
import fs from 'fs';




const router = express.Router();




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




// fetch all places with services
router.get('/', fetch_places_with_services);

// add new Place 
router.post('/add/new/place', upload.single('image'), add_new_place );


// upadte place
router.post('/update/place/:placeId', update_place);

// delete place
router.post('/delete/place/:placeId', update_place);


export default router;