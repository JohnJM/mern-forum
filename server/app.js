const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');
const fs = require('fs');
const authRoutes = require('./routes/authroutes');
const boardRoutes = require('./routes/boardroutes');
const { checkUser } = require('./middleware/authMiddleware');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { dbURI } = require('./secretconfig');


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => console.log('connected to db.'))
.then (() =>  app.listen(3001, () => console.log('listening on 3001')))
.catch(err => console.log(err));

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(boardRoutes)

app.get('/', (req, res) => {
    res.render('front')
})

app.get('/login', (req, res) => {
    res.render('login')
})

//after this line the user must be logged in.
app.get('*', checkUser);

app.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.locals.user = null;
    res.render('front', {msg: 'Successfully logged out'});
})

app.use(authRoutes);