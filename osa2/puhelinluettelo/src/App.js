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

  //get all persons from the server
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
        console.log('Person in phonebook already')
        if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
            const getPerson = persons.find(person => 
              person.name.toLowerCase() === personObject.name.toLowerCase())
      
            updatePerson(getPerson, newNumber)
          }
    } 
    
    else {
      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
        })
    }
    setNewName('')
    setNewNumber('')
    setFilteredPersons('')
  }

  const deletePerson = (name, id) => {
    console.log('Attempting to delete:', name)

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      
      //Confirmed, delete from server
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id != id))
          console.log("Deleted (name, id):", name, id)
        })
    }
    setFilteredPersons('')
  }

  const updatePerson = (person, number) => {
    console.log("Attempting to update (name, number): ", person.name, number)

    const updatedPerson = {
      name: person.name,
      number
    }
    personService
      .update(person.id, updatedPerson)
      .then(response => {
        setPersons(persons.map(oldPerson => (
          oldPerson.name === updatedPerson.name
          ? response
          : oldPerson
        )))
        console.log(`Updated number of ${person.name} to ${number}`)
      })
    setFilteredPersons('')
  }

  //Handlers

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
          handleDelete={deletePerson}
        />
    </div>
  )
}

export default App
