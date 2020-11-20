const mysql = require("mysql")

const db = mysql.createConnection({
    host:"139.59.20.197",
    user:"remoteuser",
    password:"user@remote",
    database:"docter_app"
});

db.connect((err)=>{
    // console.log(err)
    if(err){
        console.error("Database connection error" + err.stack);
        return
    }
});

module.exports = db;