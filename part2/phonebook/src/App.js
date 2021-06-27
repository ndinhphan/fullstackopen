import React, { useEffect, useState } from 'react'
import phoneServices from './phone'

const Filter = ({ handleFilterChange, nameFilter }) => {
  return (
    <div>
      filter: <input onChange={handleFilterChange} value={nameFilter} />
    </div>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const Persons = ({ persons, nameFilter, setPersons, handleDeletePerson }) => {
  // const handleDeletePerson = (id, name) => {
  //   console.log(`want to delete id=${id}`)
  //   if (window.confirm(`Delete ${name} ?`) === true)
  //     phoneServices.remove(id).then(response => {
  //       if (response.status === 200) {
  //         console.log('delete success')
  //         setPersons(persons.filter(person => person.id !== id))
  //       }
  //     }).catch(error => {
  //       setMessageType('success')
  //       setMessage(`Updated ${updatedPerson.name}`)
  //       setTimeout(() => setMessage(null), 5000)
  //     })
  // }
  const renderPersons = persons.filter((person) =>
    person.name.toLowerCase()
      .includes(nameFilter.toLowerCase()))
    .map((person) => <div className='person' key={person.name}>{person.name} {person.number} <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button></div>)
  return (
    renderPersons
  )
}

const PersonForm = ({ handleAddPerson, handleNewNameChange, newName, handleNewNumberChange, newNumber }) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input onChange={handleNewNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNewNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
      <div>debug: {newName}</div>
    </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const handleNewNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }
  const handleAddPerson = (event) => {
    event.preventDefault();
    let duplicate = false
    const person = persons.find(p => p.name === newName)
    if (person !== undefined) duplicate = true
    if (!duplicate) {
      const newPerson = { name: newName, number: newNumber }
      phoneServices.create(newPerson).then(savedPerson => {
        setMessageType('success')
        setMessage(`Added ${savedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.concat(savedPerson))
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        phoneServices.update(person.id, { ...person, number: newNumber }).then(updatedPerson => {
          setMessageType('success')
          setMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => setMessage(null), 5000)
          setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDeletePerson = (id, name) => {
    console.log(`want to delete id=${id}`)
    if (window.confirm(`Delete ${name} ?`) === true)
      phoneServices.remove(id).then(response => {
        if (response.status === 200) {
          console.log('delete success')
          setPersons(persons.filter(person => person.id !== id))
        }
      }).catch(error => {
        setMessageType('error')
        setMessage(`Information about ${name} has already been deleted from the server`)
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }


  useEffect(() => {
    phoneServices.getAll()
      .then(persons => setPersons(persons))
      .catch(error => console.log('getAll() error'))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType} />
      <Filter handleFilterChange={handleFilterChange} nameFilter={nameFilter} />

      <h1>add a new</h1>
      <PersonForm handleAddPerson={handleAddPerson} handleNewNameChange={handleNewNameChange} newName={newName} handleNewNumberChange={handleNewNumberChange} newNumber={newNumber} />
      <h1>Numbers</h1>
      <Persons persons={persons} nameFilter={nameFilter} setPersons={setPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App