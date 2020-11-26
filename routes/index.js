var express = require('express');
var router = express.Router();
var Disease = require('../model/disease')
var SubDisease = require('../model/sub-disease')
var Doctor = require('../model/doctor')
var Patient = require('../model/patient')
var User = require('../model/user')
var OP = require('../model/op');
/* GET home page. */

router.get('/',(req,res)=>{
  res.render('login',{layout:null})
})

router.post('/',(req,res)=>{
  User.login(req.body,(result,error)=>{
    if(result[0]){
        req.session.user_loged = true;
        req.session.user_id = result[0].id
        res.redirect('/dashboard')
    }
    else{
      res.render('login',{layout:null,message:'Username or Password Incorrect'})
    }
  })
})

router.get('/dashboard', function(req, res, next) {
  OP.getTodayOP((result,error)=>{
    res.render('index', { title: 'Express',ops:result });
  })
  
});

router.get('/patients',(req, res)=>{
  Patient.selectall((result,error)=>{
    res.render('patients',{patients:result})
  })
});

router.get('/doctors',(req,res)=>{
  Doctor.selectall((result,error)=>{
    res.render('doctors',{doctors:result})
  })
});

router.get('/diseases',(req,res)=>{
  Disease.selectall((result,error)=>{
    res.render('diseases',{diseases:result})
  })
})

router.get('/sub-diseases/:id',(req,res)=>{
  SubDisease.selectall((result,error)=>{
    res.render('sub-diseases',{diseases:result, parent_id:req.params.id})
  })
  
})

router.get('/users',(req,res)=>{
  User.selectall((result,error)=>{
    res.render('users',{users:result})
  })
  
})
module.exports = router;
