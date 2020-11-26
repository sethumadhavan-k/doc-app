const mysql = require("mysql")

const db = mysql.createConnection({
    host:"139.59.20.197",
    user:"remoteuser",
    password:"user@remote",
    database:"docter_app"
});


db.connect((err)=>{
    if (err) 
        console.log({"DB connect Error":err})
    console.log("connected")
});
console.log("dbconfig")


module.exports = db;