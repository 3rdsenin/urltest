const mongoose = require('mongoose');


const connect = (url) => {
    mongoose.connect(url || mongo_url);
    mongoose.connection.on("connected", () => {
        console.log("Connected to DB Successfully");
    });

    mongoose.connection.on("error", () => {
        console.log("Connection error")
    });

}

module.exports = connect;