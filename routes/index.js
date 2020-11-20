var express = require('express');
var router = express.Router();
var Disease = require('../model/disease')
var Doctor = require('../model/doctor')
var Patient = require('../model/patient')
/* GET home page. */

router.get('/',(req,res)=>{
  res.render('login',{layout:null})
})

router.get('/dashboard', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  res.render('sub-diseases',{parent_id:req.params.id})
})

router.get('/users',(req,res)=>{
  res.render('users')
})
module.exports = router;
