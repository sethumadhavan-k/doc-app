const User = require('../model/user')
const response = require('../helper/util')

exports.save = function(req,res){
    if(!req.body.u_id){
        User.save(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    else{
        User.update(req.body,(result,error)=>{
            res.send(response(result,error))
        })
    }
    
}

exports.delete = function(req,res){
    User.delete(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.get = function(req,res){
    User.find(req.params.id,(result,error)=>{
        res.send(response(result,error))
    })
}

exports.loadDT = function(req,res){

}