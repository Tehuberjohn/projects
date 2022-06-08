const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3001

morgan.token('body', function(req,res) {
    return `${JSON.stringify(req.body)}`
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})

app.get('/api/persons/:person', (req,res) =>{
    const id = req.params.person
    const person = persons.find(entry => entry.id == id)
    person ? res.json(person)
           : res.status(404).end()
})

app.get('/info', (req,res) =>{
    const date = new Date()
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1> <h2>${date}</h2>`)
})

app.delete('/api/persons/:person', (req,res) =>{
    const id = Number(req.params.person)
    persons = persons.filter(entry => entry.id != id)
    res.status(204).end()
})

const generateId = () => {
    const maxID = persons.length > 0
    ? Math.max( ...persons.map(n => n.id))
    : 0
    return maxID +1
}

app.post('/api/persons', (req,res) => {
    const body = req.body

    if(!body.name) res.status(400).json({"error":"name is missing"})
    if(!body.number) res.status(400).json({"error":"number is missing"})
    if(persons.some(entry => entry.name === body.name)) res.status(409).json({"error":"name already exists"})
    if(persons.some(entry => entry.number === body.number)) res.status(409).json({"error":"number already exists"})

    let entry = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(entry) 
})

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})