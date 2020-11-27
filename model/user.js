const db = require("../util/db");

const User =  function (data) {
    this.id = data.id ? data.id : null
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.created_at = data.created_at ? data.created_at : null;
    this.update_at = data.update_at ? data.update_at : null;
    this.deleted_at = data.deleted_at ? data.deleted_at : null;
} 

User.find = function(id,callback){
   db.select('users','*',{id},(result,error)=>{
        callback(result,error)
    })
}

User.save = function(data,callback){
        obj = {
            name:data.u_name,
            email:data.u_email,
            mobile:data.u_mobile,
            username:data.u_username,
            password:data.u_password
        }
       
       db.insert('users',obj,(result,error)=>{
            callback(result,error)
        })
}

User.update = function(data,callback){
    obj = {
        name:data.u_name,
        email:data.u_email,
        mobile:data.u_mobile,
        username:data.u_username,
        password:data.u_password
    }
    db.update('users',obj,{id:data.u_id},(result,error)=>{
        callback(result,error)
    })
}

User.delete = function(id,callback){
    db.update('users',{deleted_at:new Date()},{id},(result,error)=>{
        callback(result,error)
    })
}

User.selectall = function(callback){
    db.select('users','*',"deleted_at IS NULL",(result,error)=>{
         callback(result,error)
     })
 }

 User.login = function(data,callback){
    db.select('users','*',`username = '${data.username}' AND password = '${data.password}' AND deleted_at IS NULL`,(result,error)=>{
        callback(result,error)
    })
 }


module.exports = User