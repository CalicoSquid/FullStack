import { useEffect, useState } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Form from "./components/Form";
import apiService from "./services/persons.js";
import Notifications from "./components/Notifications.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({type: "", message: null});

  useEffect(() => {
    apiService
      .getPersons()
      .then((data) => setPersons(data))
      .catch((error) => {
        setMessage({type: "error", message: `"Error fetching persons"`});
        setTimeout(() => setMessage({type: "", message: null}), 5000);

      });
  }, []);

  useEffect(() => {
    console.log("Re-rendering users after delete, add or update");
  }, [persons]);

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
    const { name, number } = newPerson;
    const nameTaken = persons.some((p) => p.name === name);

    if (nameTaken) {
      let update = confirm(
        `${name} is already in the phonebook. Would you like to update the number?`
      );
      if (update) {
        const personToUpdate = persons.find((person) => person.name === name);
        if (personToUpdate) {
          apiService
            .updatePerson(personToUpdate.id, newPerson)
            .then((updatedPerson) => {
              setPersons((prevPersons) =>
                prevPersons.map((person) =>
                  person.id === updatedPerson.id ? updatedPerson : person
                )
              );
              setMessage({type: "success", message: `Updated ${name}`});
              setTimeout(() => setMessage({type: "", message: null}), 5000);
            })
            .catch((error) => console.error("Error updating person:", error));
        }
      }
    } else {
      if (name && number) {
        apiService
          .addPerson(newPerson)
          .then((data) => {
            setPersons((prevPersons) => [...prevPersons, data]);
            setNewPerson({ name: "", number: "" });
            setMessage({type: "success", message: `Added ${name}`});
            setTimeout(() => setMessage({type: "", message: null}), 5000);
          })
          .catch((error) => console.error("Error adding person:", error));
      } else {
        alert("Please supply both a name and a number");
      }
    }
  };

  const handleDelete = (id, name) => {
    apiService
      .deletePerson(id)
      .then(() => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        )
        setMessage({type: "success", message: `Deleted ${name} from database`});
        setTimeout(() => setMessage({type: "", message: null}), 5000);
      })
      .catch((error) => {
        setMessage({type: "error", message: `Information of ${name} has already been removed from the server`});
        setTimeout(() => setMessage({type: "", message: null}), 5000);
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <div className="top">
        <h1>Phonebook</h1>
        <Notifications message={message} />
        <Input
          title="🔎︎"
          name="filter"
          value={filter}
          handleChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <br />
      <Form
        name={newPerson.name}
        number={newPerson.number}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br />
      <div className="output">
        <h2>Numbers</h2>
        <List filteredPersons={filteredPersons} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
