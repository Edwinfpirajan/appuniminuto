const db = require('../common/connection')
const  { getAllEmployees, employeeQueryPost, employeeQueryUpdate, employeeQueryDelete }  = require('../queries/employeeQuery')

const createEmploye = (req, res) => {
    const {fName, lName, task} = req.body

    db.query(employeeQueryPost, [fName, lName, task], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.status(201).json({ message: 'Empleado creado exitosamente' })
    })
}

const getEmployee = (req, res) => {
    db.query(getAllEmployees, (err, result) => {
        if (err) {
            res.status(400).json(err)
        }
        res.status(200).json(result.rows)
    })
}

const updateEmployee = (req, res) => {
    const id = parseInt(req.params.id)
    const { fName, lName, task } = req.body

    db.query(employeeQueryUpdate, [fName, lName, task, id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Empleado no encontrado' })
            return
        }
        res.status(200).json({ message: 'Empleado actualizado exitosamente' })
    })
}

const deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id)

    db.query(employeeQueryDelete, [id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Empleado no encontrado' })
            return
        }
        res.status(200).json({ message: 'Empleado eliminado exitosamente' })
    })
}

module.exports = {
    createEmploye,
    getEmployee,
    updateEmployee,
    deleteEmployee
}