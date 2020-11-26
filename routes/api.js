const express = require('express')
const router = express.Router();

const DiseaseController = require('../controller/disease')
const SubDiseaseController = require('../controller/sub-disease')
const DoctorController = require('../controller/doctor')
const PatientController = require('../controller/patient')
const UserController = require('../controller/user')
const OPController = require('../controller/op')

router.post('/disease/save',DiseaseController.save)
router.delete('/disease/delete/:id', DiseaseController.delete)
router.get('/disease/get/:id',DiseaseController.get)

router.post('/sub-disease/save',SubDiseaseController.save)
router.delete('/sub-disease/delete/:id', SubDiseaseController.delete)
router.get('/sub-disease/get/:id',SubDiseaseController.get)



router.post('/doctor/save',DoctorController.save)
router.delete('/doctor/delete/:id', DoctorController.delete)
router.get('/doctor/get/:id',DoctorController.get)

router.post('/patient/save',PatientController.save)
router.delete('/patient/delete/:id', PatientController.delete)
router.get('/patient/get/:id',PatientController.get)
router.get('/patient/code/:id',PatientController.getByCode)

router.post('/user/save',UserController.save)
router.delete('/user/delete/:id', UserController.delete)
router.get('/user/get/:id',UserController.get)

router.post('/op/save',OPController.save)
router.delete('/op/delete/:id', OPController.delete)
router.get('/op/get/:id',OPController.get)

module.exports = router