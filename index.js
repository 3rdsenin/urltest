const express = require('express');
const cookieParser = require('cookie-parser');
const authrouter = require("./routes/auth.routes");
const urlrouter = require("./routes/url.routes");
const historyrouter = require("./routes/history.routes");
const homerouter = require("./routes/home.routes");
const customrouter = require('./routes/custom.routes');


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/auth', authrouter);
app.use('/url', urlrouter);
app.use('/custom', customrouter);
//app.use('/history', historyrouter);
app.use('/', homerouter);









module.exports = app;