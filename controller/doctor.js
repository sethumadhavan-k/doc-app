const Doctor = require('../model/doctor')
const response = require('../helper/util')

exports.save = function(req,res){
    if(!req.body.d_id){
        Doctor.save(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    else{
        Doctor.update(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    
}

exports.delete = function(req,res){
    Doctor.delete(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.get = function(req,res){
    Doctor.find(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.loadDT = function(req,res){

}