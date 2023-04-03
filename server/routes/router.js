const express = require('express')

//CONTROLADORES
const  employeeController  = require('../controllers/employeeControler')
const taskController = require('../controllers/taskController')

const router = express.Router()

router.get('/employee/all', employeeController.getEmployee)
router.post('/employee/create', employeeController.createEmploye)
router.put('/employee/edit/:id', employeeController.updateEmployee);
router.delete('/employees/delete/:id', employeeController.deleteEmployee)


router.get('/task/all', taskController.getTask)
router.post('/task/create', taskController.createTask)

module.exports = router;