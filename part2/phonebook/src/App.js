import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ search, handleFilter }) => (
  <div>
    filter shown with <input value={search} onChange={handleFilter} />
  </div>
);

const PersonForm = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  number,
}) => (
  <form onSubmit={addPerson}>
    <FormName newName={newName} handleNameChange={handleNameChange} />
    <FormNumber number={number} handleNumberChange={handleNumberChange} />
    <FormButton />
  </form>
);

const FormName = ({ newName, handleNameChange }) => (
  <div>
    name: <input value={newName} onChange={handleNameChange} />
  </div>
);

const FormNumber = ({ number, handleNumberChange }) => (
  <div>
    number: <input value={number} onChange={handleNumberChange} />
  </div>
);

const FormButton = () => (
  <div>
    <button type="submit">add</button>
  </div>
);

const List = ({ persons }) => {
  return persons.map((person) => <Person key={person.name} person={person} />);
};

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNumber(event.target.value);
  };

  const handleFilter = (event) => {
    let query = event.target.value;
    setSearch(query);
    let result = persons.filter((person) =>
      person.name.toUpperCase().includes(query.toUpperCase())
    );
    setSearchResult(result);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName) {
      emptyName();
    } else if (!number) {
      emptyNumber();
    } else {
      const personObject = {
        name: newName,
        number: number,
      };
      checkName(newName)
        ? sameName(newName)
        : setPersons(persons.concat(personObject));
      setNewName("");
      setNumber("");
    }
  };

  const checkName = (newName) => {
    let same = false;
    persons.forEach((person) => {
      if (newName.toUpperCase() === person.name.toUpperCase()) {
        same = true;
      }
    });
    return same;
  };

  const sameName = (name) => alert(`${name} is already added to phonebook`);
  const emptyName = () => alert("Please enter a name");
  const emptyNumber = () => alert("Please enter a number");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        number={number}
      />
      <h3>Numbers</h3>
      {search ? <List persons={searchResult} /> : <List persons={persons} />}
    </div>
  );
};

export default App;
