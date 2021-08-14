import React, { useState } from 'react';

const List = ({ persons }) => {
  return persons.map((person) => <Person key={person.name} person={person}/>)
};

const Person = ({ person }) => <p>{person.name}</p>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('add a person!');

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName
    }
    checkName(newName) ?
      sameName(newName) :
      setPersons(persons.concat(personObject));
    setNewName('');
  }

  const checkName = (newName) => {
    let same = false;
    persons.forEach((person) => {
      if (newName === person.name) {
        same = true;
      }
    })
    return same;
  }

  const sameName = (name) => alert(`${name} is already added to phonebook`);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <List persons={persons} />
    </div>
  );
}

export default App;
