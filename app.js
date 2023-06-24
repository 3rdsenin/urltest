const app = require('./index');
const connect = require('./database/index')
require("dotenv").config();
const port = process.env.PORT || 5000

const mongo_url = process.env.MONGODB_URL;

connect(mongo_url);





app.listen(port, () => {
    console.log("Server Started on Port " + port);
})