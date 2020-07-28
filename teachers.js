const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

exports.show = (req, res) => {
    const { id } = req.params
    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send('instructor not found')
    const teacher = {
        ...foundTeacher,
        area: foundTeacher.area.split(','),
        schooling: graduation(foundTeacher.schooling),
        birth: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat('en-US').format(foundTeacher.created_at)
    }
    return res.render('teachers/show', { teacher })
}
exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            res.send('por favor preencha todos os campos')
        }
    }
    let { url, name, birth, schooling, type_of_class, area } = req.body
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        name,
        url,
        created_at,
        birth,
        schooling,
        type_of_class,
        area
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Erro ao gerar arquivo')
        return res.redirect('/teachers')
    })
}
exports.edit = (req, res) => {
    const { id } = req.params
    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send('instructor not found')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),

    }

    return res.render('teachers/edit', { teacher })
}