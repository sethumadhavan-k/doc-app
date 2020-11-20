const db = require("../util/db");

const Disease =  function (data) {
    this.id = data.id ? data.id : null
    this.name = data.name;
    this.created_at = data.created_at ? data.created_at : null;
    this.update_at = data.update_at ? data.update_at : null;
    this.deleted_at = data.deleted_at ? data.deleted_at : null;
} 

Disease.find = function(id,callback){
   db.select('diseases','*',{id},(result,error)=>{
        callback(result,error)
    })
}

Disease.save = function(data,callback){
       db.insert('diseases',{name:data.d_name},(result,error)=>{
            callback(result,error)
        })
}

Disease.update = function(data,callback){
    console.log(data)
    db.update('diseases',{name:data.d_name},{id:data.d_id},(result,error)=>{
        callback(result,error)
    })
}

Disease.delete = function(id,callback){
    db.update('diseases',{deleted_at:new Date()},{id},(result,error)=>{
        callback(result,error)
    })
}

Disease.selectall = function(callback){
    db.select('diseases','*',"deleted_at IS NULL",(result,error)=>{
         callback(result,error)
     })
 }


module.exports = Disease