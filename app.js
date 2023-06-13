const app = require('./index');
const connect = require('./database/index')
require("dotenv").config();
const port = process.env.PORT || 5000

connect();





app.listen(port, () => {
    console.log("Server Started on Port " + port);
})