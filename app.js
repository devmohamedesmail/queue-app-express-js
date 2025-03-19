import express from 'express';
import places from './server/routes/admin/places.js'
import placesapi from './server/routes/api/places.js'
import queueapi from './server/routes/api/queue.js'
import services from './server/routes/admin/services.js'
import servicesapi  from './server/routes/api/services.js'
import path from 'path';

const app = express();


//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __dirname = path.resolve();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/admin/index', (req, res) => {
    res.render('admin/index');
})

// Places Routes file
app.use('/places', places);


// Services Routes file
app.use('/services', services)






// ********************************************************* Api Routes Start *********************************************************
// Places Api Routes file
app.use('/api/v1/places', placesapi);

// Queue Api Routes file
app.use('/api/v1/queues', queueapi);


// Services Api Routes file
app.use('/api/v1/services', servicesapi);

// ********************************************************* Api Routes End *********************************************************





app.get('/', (req, res) => {
    res.render('admin/index');
})





app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});