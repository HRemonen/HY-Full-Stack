const { response, request } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Helas",
    number: "040-123-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "111-1223123"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "123-123123"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "040112412"
  }

]
app.get('/', (req, res) => {
    res.send('<h1>Phonebook!</h1>')
})

app.get('/info', (req, res) => {
    const time = new Date()

    res.send(`<p>Phonebook has info for ${persons.length} people </br> ${time} </p>`)
})
  
app.get('/api/persons', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = +request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    }
    else {
        response.status(404).end()
    }
  })

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }   
  
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = +request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
  
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})