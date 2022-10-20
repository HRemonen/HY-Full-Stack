import { useState, useEffect } from 'react'

import personService from './services/personService'

import ShowPersons from './components/ShowPersons'
import AddPerson from './components/AddPerson'
import FilterPersons from './components/FilterPersons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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

          setMessage(`Added person '${personObject.name}' to the Phonebook`)
          setMessageType('success-msg')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000);
        })
        .catch(error => {
          console.log("Error occured while adding (name, id, error) to the server:", error)

          setMessage(error.response.data.error)
          setMessageType('error-msg')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000);
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
          setPersons(persons.filter(person => person.id !== id))
          console.log("Deleted (name, id):", name, id)

          setMessage(`Deleted the person '${name}' from the Phonebook`)
          setMessageType('warning-msg')
          setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 5000);
        })
        .catch(() => {
          console.log("Error occured while deleting (name, id) from the server:", name, id)

          setMessage(`Person '${name}' has been already deleted from the Phonebook`)
          setMessageType('error-msg')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000);
          setPersons(persons.filter(person => person.id !== id))
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
        console.log(`Updated number of person ${person.name} to ${number}`)

        setMessage(`Updated the number of the person '${person.name}' to (${number})`)
        setMessageType('success-msg')
        setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000);
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
        <Notification message={message} type={messageType}/>
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
