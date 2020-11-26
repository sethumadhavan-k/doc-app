const SubDisease = require('../model/sub-disease')
const response = require('../helper/util')

exports.save = function(req,res){
    if(!req.body.sd_id){
        SubDisease.save(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    else{
        SubDisease.update(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    
}

exports.delete = function(req,res){
    SubDisease.delete(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.get = function(req,res){
    SubDisease.find(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.loadDT = function(req,res){

}