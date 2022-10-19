const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { response, request } = require('express')
const Person = require('./models/person')

const app = express()

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//Setting the post token for morgan.
morgan.token('post', function (request, response) {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return ""
})

//Tiny formatting + post token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))


app.get('/', (request, response) => {
    response.send('<h1>Phonebook!</h1>')
})

app.get('/info', (request, response) => {
    const time = new Date()

    response.send(`<p>Phonebook has info for ${persons.length} people </br> ${time} </p>`)
})
  
app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            console.log('Retriving person data from database')
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
  })

const generateId = () => {
    console.log('Generating random id')
    return Math.floor(Math.random() * 9999999)
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'Person info missing' 
        })
    }

    else if (persons.some(person => 
        person.name.toLowerCase() === body.name.toLowerCase())) {
            console.log(`Person named ${body.name} already in phonebook`)
            return response.status(409).json({
                error: `Person named ${body.name} already in phonebook`
            })
        }
  
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number || false
    }
  
    persons = persons.concat(newPerson)
  
    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
  