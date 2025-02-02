require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');


const flash = require('connect-flash');

const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );
  
  // Flash Messages
  app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
// app.get('/',(req,res)=>{
//     res.render('index');
// });
app.use('/', require('./server/routes/customer'));
app.get('*',(req,res)=>{
    res.status(404).render('404');
});
app.listen(port,()=>{
    console.log("server started on port 5000");
});