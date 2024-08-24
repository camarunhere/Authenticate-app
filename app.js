const express  = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes');
const cookieParser= require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const port= 9053;

// middle ware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://ArunDB:arun1234@nodetasks.bk8qr.mongodb.net/Nodetasks?retryWrites=true&w=majority&appName=Nodetasks';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
