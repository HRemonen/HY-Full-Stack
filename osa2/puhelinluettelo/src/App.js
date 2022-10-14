import { useState, useEffect } from 'react'

import personService from './services/personService'

import ShowPersons from './components/ShowPersons'
import AddPerson from './components/AddPerson'
import FilterPersons from './components/FilterPersons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')

  const getPersonsHook = () => {
    console.log("Getting person data from server")
    personService
      .getAll()
      .then(initialPersons => {
        console.log('Fetched Person data from server succesfully')
        setPersons(initialPersons)
      })
  }

  useEffect(getPersonsHook, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (personObject.name === "") {
      alert(`Empty string is not valid input.`)
    } 
    
    else if (persons.some(person => 
      person.name.toLowerCase() === 
      personObject.name.toLowerCase())) {
        alert(`${personObject.name} is already added to phonebook.`)
    } 
    
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
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
