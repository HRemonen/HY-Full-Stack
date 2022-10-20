require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

//Setting the post token for morgan.
morgan.token('post', request => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

//Tiny formatting + post token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook!</h1>')
})

app.get('/info', (request, response) => {
  const time = new Date()
  Person
    .find({}).then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people </br> ${time} </p>`)
    })
})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      console.log('Retriving person data from database')
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Person info missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(newPerson => {
      response.json(newPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(
    request.params.id, person,
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
