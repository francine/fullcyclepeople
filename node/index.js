const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const insertQuery = `INSERT INTO people(name) values('Francine Costa')`
connection.query(insertQuery)

var people = []
const searchQuery = 'SELECT * FROM people'
connection.query(searchQuery, (error, results, fields) => {
    if (error) console.log(error)
    connection.end()
    people = results
})
connection.end

app.get('/', (req, res) => {
    var html = '<h1>Full Cycle<h1/>'
    people.forEach(element => {
        html += `<h4>${element.name}</h4>`
    })
    res.send(html)
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})
