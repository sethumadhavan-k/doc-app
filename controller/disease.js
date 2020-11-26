const Disease = require('../model/disease')
const response = require('../helper/util')

exports.save = function(req,res){
    if(!req.body.d_id){
        Disease.save(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    else{
        Disease.update(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    
}

exports.delete = function(req,res){
    Disease.delete(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.get = function(req,res){
    Disease.find(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.loadDT = function(req,res){

}