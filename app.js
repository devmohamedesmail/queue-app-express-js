import express from 'express';
import placesapi from './routes/api/places.js'
import queueapi from './routes/api/queue.js'
import servicesapi from './routes/api/services.js'
import settingapi from './routes/api/setting.js'
import auth from './routes/front/auth.js'
import authapi from './routes/api/auth.js'
import frontroutes from './routes/front/front.js'
import subscribe_routes from './routes/subscriber/routes.js'
import { protect } from './middlewares/authMiddleware.js';
import userRoutes from './routes/front/routes.js'
import admin from './routes/admin/routes.js';
import api from './routes/api/routes.js'
import { setupApp } from './config/appConfig.js';



// dotenv.config();


const app = express();


await setupApp(app);








// *************** Users Routes file 
app.use('/users', auth)
// *************** Front End Routes 
app.use('/front', frontroutes);

app.use('/' , userRoutes );
   





// *************** Admin Routes file
app.use('/admin' , protect , admin );
// *************** Subscriber file
app.use('/subscriber', subscribe_routes);






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

app.use('/api/v1', api);

// ********************************************************* Api Routes End *********************************************************





app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});