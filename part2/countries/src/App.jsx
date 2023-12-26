import { useEffect, useState } from "react";
import "./App.css";

import Form from "./components/Form";
import Message from "./components/Message";
import Country from "./components/Country";
import List from "./components/List";

import services from "./services/countries";

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState(null);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    services
    .getAllCountries()
    .then((data) => setList(data));
  }, []);

  useEffect(() => {
    if (search) {
      const filter = list.filter((item) =>
        item.name.common.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredList(filter);
      setShowList(filter.length !== 1 && filter.length <= 10);
      setCountry(filter.length === 1 ? filter[0] : null);

      setMessage(
        filter.length > 10
          ? "Too many results, please specify a different filter"
          : filter.length === 0
          ? "No results found"
          : null
      );
    }
  }, [search, list]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const displayCountry = (name) => {
    services
    .getCountry(name)
    .then((data) => {
      setCountry(data);
      setShowList(false);
    });
  };

  return (
    <div className="main">
      <h1>Country Search</h1>
      <Form handleChange={handleChange} />
      <Message message={message} />
      <br />
      <List list={filteredList} displayCountry={displayCountry} showList={showList} />
      <Country country={country} />
    </div>
  );
}

export default App;
