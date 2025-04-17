import express from 'express';

import path from 'path';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';

// routes files

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



dotenv.config();


const app = express();











//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();

app.use(express.static('public'));
app.use(expressLayouts);
app.set("layout", "layouts/main");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');






// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // true إذا عندك HTTPS فقط
    maxAge: 1000 * 60 * 60 * 24 * 7 // أسبوع
  }
}));


// flash middleware
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});




app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});






// *************** Dashboard Routes file  




// *************** Setting Routes file  

// *************** Users Routes file 
app.use('/users', auth)
// *************** Front End Routes 
app.use('/front', frontroutes);

app.use('/' , userRoutes );
   





// *************** Admin Routes file
app.use('/admin' , protect , admin );
// *************** Subscriber file
app.use('/subscriber', protect, subscribe_routes);






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











app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});