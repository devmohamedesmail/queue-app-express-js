import express from 'express';
import { fetch_places_with_services , add_new_place, update_place,show_place_qrcode } from '../../controllers/api/PlaceApiController.js';
import multer from 'multer';





const router = express.Router();


const storage = multer.memoryStorage(); // store file in memory buffer
const upload = multer({ storage });







// fetch all places with services
router.get('/', fetch_places_with_services);

// add new Place 
router.post('/add/new/place', upload.single('image'), add_new_place );


// upadte place
router.post('/update/place/:placeId',upload.single('image'), update_place);

// delete place
router.post('/delete/place/:placeId', update_place);


// show qr code 
router.get('/show/place/qrcode/:placeId' , show_place_qrcode)


export default router;