var mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api_node",
});

db.connect(function (err) {
    if(err) {
        db.disconnect();
        return console.log(err);
    } else

    console.log('db connected');
});

module.exports = db;