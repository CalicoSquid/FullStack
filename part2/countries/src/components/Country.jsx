import { useEffect, useState } from "react";
import services from "../services/weather";
import Weather from "./Weather";

export default function Country({ country }) {
  if (!country) return;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const latlng = country.capitalInfo.latlng.map((x) => x);
    services
    .getWeatherData(latlng[0], latlng[1])
    .then((data) => {
      setWeather(data);
    });
  }, []);

  const languageList = Object.keys(country.languages).map((languageCode) => (
    <li className="language" key={languageCode}>
      {country.languages[languageCode]}
    </li>
  ));

  return (
    <div className="country-container">
      <h1>{country.name.common}</h1>
      {country.coatOfArms.png && (
        <img
          src={country.coatOfArms.png}
          style={{ height: "50px", width: "50px" }}
        />
      )}
      <p className="info">
        <strong>Capital City:</strong> {country.capital[0]}
      </p>
      <p className="info">
        <strong>Area:</strong> {country.area} km²
      </p>
      <p className="info">
        <strong>Population:</strong> {parseInt(country.population, 10).toLocaleString()}
      </p>
      <ul className="info">
        <strong>{languageList.length > 1 ? "Languages:" : "Language:"}</strong>
        {languageList}
      </ul>
      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{ width: "200px" }}
      />
      <Weather weatherObj={weather} city={country.capital[0]} />
    </div>
  );
}
