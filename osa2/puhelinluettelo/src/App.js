import { useState } from 'react'
import ShowPersons from './components/ShowPersons'
import AddPerson from './components/AddPerson'
import FilterPersons from './components/FilterPersons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    if (personObject.name === "") {
      alert(`Empty string is not valid input.`)
    } else if (persons.some(person => 
      person.name.toLowerCase() === 
      personObject.name.toLowerCase())) {
        alert(`${personObject.name} is already added to phonebook.`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    setFilteredPersons('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilteredPersons(persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterPersons 
          handleFilterChange={handleFilterChange} />          
      <h3>Add a new person</h3>
        <AddPerson 
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
        />
      <h3>Numbers</h3>
        <ShowPersons 
          persons={persons}
          filtered={filteredPersons}
        />
    </div>
  )

}

export default App
