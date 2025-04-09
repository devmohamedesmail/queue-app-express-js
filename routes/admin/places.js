import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path'
import fs from 'fs';
import { add_new_place, delete_place, edit_place_confirm, edit_place_page } from '../../controllers/web/PlaceController.js'










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




//************************* Add new Place *********************************
router.post('/add/new/place', upload.single('image'), add_new_place)



//************************* redirect Edit page *************************
router.get('/edit/place/:id', edit_place_page)


// ************************* Edit Place confimation *************************
router.post('/edit/place/confirm/:id',upload.single('image'), edit_place_confirm)





// ************************* Delete Place *************************
router.get('/delete/place/:id', delete_place)

export default router;