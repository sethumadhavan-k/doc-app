const db = require("../util/db");

const Doctor =  function (data) {
    this.id = data.id ? data.id: null;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.place = data.place;
    this.sex = data.sex;
    this.disease = data.disease;
    this.created_at = data.created_at ? data.created_at: null;
    this.update_at = data.update_at ? data.update_at: null;
    this.deleted_at = data.deleted_at ? data.deleted_at: null;
} 

Doctor.find = function(id,callback){
   db.select('doctors','*',{id},(result,error)=>{
        callback(result,error)
    })
}

Doctor.save = function(data,callback){
    obj = {
        name: data.d_name,
        mobile: data.d_mobile,
        email: data.d_email,
        place: data.d_place,
        sex: data.d_sex,
        disease: data.d_disease
    }
    db.insert('doctors',obj,(result,error)=>{
        callback(result,error)
    })
}

Doctor.update = function(data,callback){
    obj = {
        name: data.d_name,
        mobile: data.d_mobile,
        email: data.d_email,
        place: data.d_place,
        sex: data.d_sex,
        disease: data.d_disease
    }
    db.update('doctors',obj,{id:data.d_id},(result,error)=>{
        callback(result,error)
    })
}

Doctor.delete = function(id,callback){
    db.update('doctors',{deleted_at:new Date()},{id},(result,error)=>{
        console.log(error)
        callback(result,error)
    })
}

Doctor.selectall = function(callback){
    db.select('doctors','*',"deleted_at IS NULL",(result,error)=>{
         callback(result,error)
     })
 }


module.exports = Doctor