const express = require('express')
const router = express.Router();

const DiseaseController = require('../controller/disease')
const DoctorController = require('../controller/doctor')
const PatientController = require('../controller/patient')

router.post('/disease/save',DiseaseController.save)
router.delete('/disease/delete/:id', DiseaseController.delete)
router.get('/disease/get/:id',DiseaseController.get)


router.post('/doctor/save',DoctorController.save)
router.delete('/doctor/delete/:id', DoctorController.delete)
router.get('/doctor/get/:id',DoctorController.get)

router.post('/patient/save',PatientController.save)
router.delete('/patient/delete/:id', PatientController.delete)
router.get('/patient/get/:id',PatientController.get)



module.exports = router