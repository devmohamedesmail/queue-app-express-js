import express from 'express';
import places  from './server/routes/admin/places.js'
import path from 'path';
import ejs from 'ejs';
const app = express();
import connectDB from './server/config/db.js';

//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __dirname = path.resolve();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use('/admin', places);
 app.get('/', (req, res) => {
    res.render('admin/index');
 })





app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});