const Patient = require('../model/patient')
const response = require('../helper/util')

exports.save = function(req,res){
    if(!req.body.p_id){
        Patient.save(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    else{
        Patient.update(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    
}

exports.delete = function(req,res){
    Patient.delete(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.get = function(req,res){
    Patient.find(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.getByCode = function(req,res){
    Patient.getByCode(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.loadDT = function(req,res){

}