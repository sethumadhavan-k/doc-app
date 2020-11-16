var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/',(req,res)=>{
  res.render('login',{layout:null})
})

router.get('/dashboard', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/patients',(req, res)=>{
  res.render('patients')
});

router.get('/doctors',(req,res)=>{
  res.render('doctors')
});

router.get('/diseases',(req,res)=>{
  res.render('diseases')
})

router.get('/sub-diseases',(req,res)=>{
  res.render('sub-diseases')
})

router.get('/users',(req,res)=>{
  res.render('users')
})
module.exports = router;
