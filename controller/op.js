const OP = require('../model/op')
const response = require('../helper/util')

exports.save = function(req,res){
    if(!req.body.op_id){
        OP.save(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    else{
        OP.update(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    
}

exports.delete = function(req,res){
    OP.delete(req.params.id,(result,error)=>{
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