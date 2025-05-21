import express from 'express';
import { setupApp } from './config/appConfig.js';


import placesRoutes from './routes/api/placesRoutes.js'
import queueRoutes from './routes/api/queueRoutes.js'
import servicesRoutes from './routes/api/servicesRoutes.js'
import settingRoutes from './routes/api/settingRoutes.js'
import pagesRoutes from './routes/api/pagesRoutes.js'
import authRoutes from './routes/api/authRoutes.js'



import auth from './routes/front/auth.js'
import frontroutes from './routes/front/front.js'
import subscribe_routes from './routes/subscriber/routes.js'
import { protect } from './middlewares/authMiddleware.js';
import userRoutes from './routes/front/routes.js'
import admin from './routes/admin/routes.js';
import api from './routes/api/routes.js'







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
app.use('/api/v1/places', placesRoutes);

// Queue Api Routes file
app.use('/api/v1/queues', queueRoutes);

// Services Api Routes file
app.use('/api/v1/services', servicesRoutes);

// settings Api Routes file
app.use('/api/v1/settings', settingRoutes);

// Auth Api Routes file
app.use('/api/v1/auth', authRoutes);


// pages api Routes file
app.use('/api/v1/pages', pagesRoutes)

app.use('/api/v1', api);

// ********************************************************* Api Routes End *********************************************************





app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});