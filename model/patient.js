const db = require("../util/db");

const Patient =  function (data) {
    this.id = data.id ? data.id: null;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.place = data.place;
    this.sex = data.sex;
    this.age = data.age;
    this.disease = data.disease;
    this.disease_sub = data.disease_sub;
    this.doctor = data.doctor;
    this.course_complete = data.course_complete;

    this.created_at = data.created_at ? data.created_at: null;
    this.update_at = data.update_at ? data.update_at: null;
    this.deleted_at = data.deleted_at ? data.deleted_at: null;
} 

Patient.find = function(id,callback){
   db.select('patients','*',{id},(result,error)=>{
        callback(result,error)
    })
}

Patient.save = function(data,callback){
        obj = {
            name: data.p_name,
            mobile: data.p_mobile,
            email: data.p_email,
            place: data.p_place,
            sex: data.p_sex,
            age: data.p_age,
            disease: data.p_disease,
            disease_sub: data.p_disease_sub,
            doctor: data.p_doctor,
        }

       db.insert('patients',obj,(result,error)=>{
            callback(result,error)
        })
}

Patient.update = function(data,callback){
    obj = {
        name: data.p_name,
        mobile: data.p_mobile,
        email: data.p_email,
        place: data.p_place,
        sex: data.p_sex,
        age: data.p_age,
        disease: data.p_disease,
        disease_sub: data.p_disease_sub,
        doctor: data.p_doctor,
    }
    db.update('patients',obj,{id:data.p_id},(result,error)=>{
        callback(result,error)
    })
}

Patient.delete = function(id,callback){
    db.update('patients',{deleted_at:new Date()},{id},(result,error)=>{
        callback(result,error)
    })
}

Patient.selectall = function(callback){
    db.select('patients','*',"deleted_at IS NULL",(result,error)=>{
         callback(result,error)
     })
 }

 Patient.getByCode = function(pcode,callback){
    db.select('patients','*',`code ='${pcode}'`,(result,error)=>{
         callback(result,error)
     })
 }


module.exports = Patient