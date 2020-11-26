const db = require("../util/db");

const OP =  function (data) {
    this.id = data.id ? data.id : null
    this.code = data.code;
    this.patient_id = data.patient_id;
    this.doctor_id = data.doctor_id;
    this.date = data.datem;
    this.note = data.note
    this.created_at = data.created_at ? data.created_at : null;
    this.update_at = data.update_at ? data.update_at : null;
    this.deleted_at = data.deleted_at ? data.deleted_at : null;
} 

OP.find = function(id,callback){
   db.select('op','*',{id},(result,error)=>{
        callback(result,error)
    })
}

OP.save = function(data,callback){
        obj = {
            patient_id:data.p_id,
            doctor_id:data.p_op_doctor,
            date:data.p_date,
            note:data.p_note
        }
       db.insert('op',obj,(result,error)=>{
            callback(result,error)
        })
}

OP.update = function(data,callback){
    obj = {
        patient_id:data.p_id,
        doctor_id:data.p_op_doctor,
        date:data.p_date,
        note:data.p_note
    }
    db.update('op',obj,{id:data.d_id},(result,error)=>{
        callback(result,error)
    })
}

OP.delete = function(id,callback){
    db.update('op',{deleted_at:new Date()},{id},(result,error)=>{
        callback(result,error)
    })
}

OP.selectall = function(callback){
    db.select('op','*',"deleted_at IS NULL",(result,error)=>{
         callback(result,error)
     })
 }

 OP.getTodayOP = function(callback){
    date = new Date();
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    db.raw(`SELECT op.id as oid, patients.code as pcode,patients.name as pname,doctors.name as dname,patients.mobile,op.note FROM op JOIN patients ON patients.id = op.patient_id JOIN doctors ON op.doctor_id = doctors.id WHERE op.date = '${date}'`,(result,error)=>{
        callback(result,error)
    })
}

 OP.getOPHistory = function(PID,callback){
    db.select('op','*',`patient_id =  ${PID}`,(result,error)=>{
        callback(result,error)
    })
 }





module.exports = OP