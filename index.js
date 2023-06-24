const express = require('express');
const authrouter = require("./routes/auth.routes");
const urlrouter = require("./routes/url.routes");
const historyrouter = require("./routes/history.routes");
const homerouter = require("./routes/home.routes");
const customrouter = require('./routes/custom.routes');
const session = require('express-session');
require('dotenv').config();
const rateLimit = require("express-rate-limit");


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.jwt_secret,
    cookie: {
        sameSite: 'none'
    }
}));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,


})

app.use(limiter)
app.use('/auth', authrouter);
app.use('/url', urlrouter);
app.use('/custom', customrouter);
app.use('/history', historyrouter);
app.use('/', homerouter);









module.exports = app;