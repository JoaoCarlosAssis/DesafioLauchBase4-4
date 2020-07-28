const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.redirect('/teachers')
})

routes.get('/teachers', (req, res) => {
    return res.render('teachers/teachers')
})
routes.get('/teachers/create', (req, res) => {
    res.render('teachers/create')
})
routes.post('/teachers', teachers.post)

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)



routes.get('/students', (req, res) => {
    return res.render('students/students')
})
module.exports = routes