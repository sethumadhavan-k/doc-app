const db = require('../config/dbconfig.js')

function DB(){
    this.db = db;
}

DB.insert = (table,values,callback = null)=>{
    let sql = `INSERT INTO ${table} SET ?`;
    db.query(sql,values,(error,result)=>{
        if(callback){
            return callback(result,error)
        }
    });
};

DB.update = (table,values,where = false,callback = null)=>{
    let sql = `UPDATE ${table} SET `;
    let sqlValues = [];
    for (let [key,value] of Object.entries(values)){
        sql = sql + `${key} = ? ,`;
        sqlValues.push(value)
    }

    sql = sql.slice(0,sql.length  -1)
    

    if (where){
        sql = sql + 'WHERE '
        for (let [key,value] of Object.entries(where)){
            sql = sql + `${key} = ? `;
            sqlValues.push(value)
        }
    }
    db.query(sql,sqlValues,(error,result)=>{
        if(callback){
            callback(result,error)
        }
    })
}

DB.delete = (table,where=false,callback=null)=>{
    let sql = `DELETE FROM ${table} `;
    let sqlValues = [];
    if (where){
        sql = sql + 'WHERE '
        for (let [key,value] of Object.entries(where)){
            sql = sql + `${key} = ? `;
            sqlValues.push(value)
        }
    }
    db.query(sql,sqlValues,(error,result)=>{
        if(callback){
            callback(result,error)
        }
    })
}

DB.select = (table,columns,where = false,callback = false)=> {
    let sql = `SELECT ${columns} FROM ${table} ` ;
    sqlValues = [];
    if (where && typeof where == 'object'){
        sql = sql + 'WHERE '
        for (let [key,value] of Object.entries(where)){
            sql = sql + `${key} = ? `;
            sqlValues.push(value)
        }
    }

    if(where && typeof where == 'string'){
        sql = sql + 'WHERE ' + where
    }

    db.query(sql,sqlValues,(error,result)=>{
        if(callback){
            callback(result,error)
        }
    })
}

DB.raw = (sql,callback)=>{
    db.query(sql,(error,result)=>{
        if(callback){
            callback(result,error)
        }
    })
}



// console.log(db)

module.exports = DB;