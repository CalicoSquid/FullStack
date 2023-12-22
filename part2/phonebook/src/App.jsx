import { useState } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "012345678" },
  ]);
  const [newPerson, setNewPerson] = useState({});
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewPerson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameTaken = persons.some((p) => p.name === newPerson.name);
    if (isNameTaken) {
      alert(`${newPerson.name} is already added to the phonebook!`);
    } else {
      if (newPerson.name) {
        let personList = [...persons];
        personList.push({ name: newPerson.name, number: newPerson.number });
        setPersons(personList);
        setNewPerson({});
      }
    }
  };

  const handleCheckFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Input
        title="Filter"
        name="filter"
        value={filter}
        handleChange={handleCheckFilter}
      />
      <br />
      <Form
        name={newPerson.name}
        number={newPerson.number}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>

      <List filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
