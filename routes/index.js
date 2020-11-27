var express = require('express');
var router = express.Router();
var Disease = require('../model/disease')
var SubDisease = require('../model/sub-disease')
var Doctor = require('../model/doctor')
var Patient = require('../model/patient')
var User = require('../model/user')
var OP = require('../model/op');

var DB = require('../util/db')
/* GET home page. */

router.get('/',(req,res)=>{
  res.render('login',{layout:null})
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
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
  
  
  console.log('sss')
  a =  DB.asyncRaw("select * from users")
  console.log(a)
  OP.getTodayOP((result,error)=>{
     res.render('index', { title: 'Express',ops:result });
  })
  
});

router.get('/patients',(req, res)=>{
  let sql = "SELECT patients.id, patients.code,patients.name,patients.mobile,patients.place,diseases_sub.name as dis_name,doctors.name as dname FROM patients,diseases_sub,doctors WHERE patients.disease_sub = diseases_sub.id AND patients.doctor =  doctors.id";
  
  Disease.selectall((result,error)=>{
    diseases = result;
    DB.raw(sql,(result,error)=>{
      res.render('patients',{patients:result,diseases})
    });
  })
  
});

router.get('/doctors',(req,res)=>{
  let sql = "SELECT doctors.id, doctors.name, mobile,email,place ,diseases.name as dname FROM doctors,diseases WHERE doctors.disease = diseases.id AND doctors.deleted_at IS NULL";
  Disease.selectall((result,error)=>{
    diseases = result;
    DB.raw(sql,(result,error)=>{
      res.render('doctors',{doctors:result,diseases:diseases})
    })
  })
});

router.get('/diseases',(req,res)=>{
  let sql = "SELECT * ,(SELECT count(*) FROM patients WHERE patients.disease = diseases.id) AS count FROM diseases WHERE deleted_at IS NULL";
  DB.raw(sql,(result,error)=>{
    res.render('diseases',{diseases:result})
  })
})

router.get('/sub-diseases/:id',(req,res)=>{
  let sql = "SELECT * ,(SELECT count(*) FROM patients WHERE patients.disease_sub = diseases_sub.id) AS count FROM diseases_sub WHERE parent = "+req.params.id+" AND deleted_at IS NULL";
  DB.raw(sql,(result,error)=>{
    res.render('sub-diseases',{diseases:result, parent_id:req.params.id})
  })
  
})

router.get('/users',(req,res)=>{
  User.selectall((result,error)=>{
    res.render('users',{users:result})
  })
  
})
module.exports = router;
