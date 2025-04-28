import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import cookieParser from "cookie-parser";
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import i18n from 'i18n';
import connectDB from './db.js';
import Setting from '../models/Setting.js';
import cors from 'cors';


dotenv.config();
const __dirname = path.resolve();

export async function setupApp(app){

// cors setting 
app.use(cors());


//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const __dirname = path.resolve();

app.use(express.static('public'));
app.use(expressLayouts);
app.set("layout", "layouts/main");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// i18n configuration
i18n.configure({
  locales: ['en', 'ar'], // Add your languages here
  directory: path.join(__dirname, 'locales'), // Translation files
  defaultLocale: 'en',
  cookie: 'lang', // Optional: to use cookies for language
  queryParameter: 'lang', // Optional: for ?lang=ar
  autoReload: true,
  syncFiles: true
});

// Middleware
app.use(i18n.init);



// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 * 7 
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



// *************** Share data entire all application 
connectDB();
const settings = await Setting.findOne(); 
app.locals.settings = settings;

// ***************************************************



}