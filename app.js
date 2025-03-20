import express from 'express';
import places from './server/routes/admin/places.js'
import placesapi from './server/routes/api/places.js'
import queueapi from './server/routes/api/queue.js'
import services from './server/routes/admin/services.js'
import servicesapi  from './server/routes/api/services.js'
import dashboard from './server/routes/admin/dashboard.js'
import setting from './server/routes/admin/setting.js'
import settingapi from './server/routes/api/setting.js'
import auth from './server/routes/front/auth.js'
import authapi from './server/routes/api/auth.js'
import path from 'path';
import dotenv from "dotenv";
dotenv.config();


const app = express();


//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __dirname = path.resolve();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');






// ********************************************************* Dashboard Routes file  *********************************************************
app.use('/dashboard', dashboard )
// ********************************************************* Places Routes file  ************************************************************
app.use('/places', places);
// ********************************************************* Services Routes file  *********************************************************
app.use('/services', services)
// ********************************************************* Setting Routes file  **********************************************************
app.use('/settings', setting)
// ********************************************************* Users Routes file *********************************************************
app.use('/users', auth)






// ********************************************************* Api Routes Start *********************************************************
// Places Api Routes file
app.use('/api/v1/places', placesapi);

// Queue Api Routes file
app.use('/api/v1/queues', queueapi);

// Services Api Routes file
app.use('/api/v1/services', servicesapi);

// settings Api Routes file
app.use('/api/v1/settings', settingapi);

// Auth Api Routes file
app.use('/api/v1/auth', authapi);

// ********************************************************* Api Routes End *********************************************************





app.get('/', (req, res) => {
    res.render('front/index');
})





app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});