import React, { useState, useEffect } from "react";
import axios from "axios";
import REACT_APP_WEATHER_API_KEY from "./config.js";

const Matches = ({ results, onClick, weather }) => {
  if (results.length > 10) {
    return <MultiMatch result={"Too many matches, specify another filter"} />;
  } else if (results.length > 1 && results.length <= 10) {
    return results.map((result) => (
      <MultiMatch
        key={result.name}
        result={result.name}
        button={<ShowButton onClick={onClick} country={result.name} />}
      />
    ));
  }
  return results.map((result) => (
    <Match
      key={result.name}
      name={result.name}
      capital={result.capital}
      population={result.population}
      languages={result.languages}
      flag={result.flag}
      weather={weather}
    />
  ));
};

const MultiMatch = ({ result, button }) => (
  <p>
    {result} {button}
  </p>
);

const ShowButton = ({ onClick, country }) => (
  <button onClick={onClick} value={country}>
    show
  </button>
);

const Match = ({ name, capital, population, languages, flag, weather }) => (
  <div>
    <Name name={name} />
    <Capital capital={capital} />
    <Population population={population} />
    <Languages languages={languages} />
    <Flag flag={flag} name={name} />
    <Weather capital={capital} weather={weather} />
  </div>
);

const Name = ({ name }) => <h1>{name}</h1>;

const Capital = ({ capital }) => <p>capital {capital}</p>;

const Population = ({ population }) => <p>population {population}</p>;

const Languages = ({ languages }) => {
  return (
    <>
      <h2>Spoken languages</h2>
      <ul>
        {languages.map((language) => (
          <Language key={language.name} language={language.name} />
        ))}
      </ul>
    </>
  );
};

const Language = ({ language }) => <li>{language}</li>;

const Flag = ({ flag, name }) => (
  <img src={flag} alt={`Flag of ${name}`} width="150" height="100" />
);

const Weather = ({ capital, weather }) => {
  return (
    <>
      <h2>Weather in {capital}</h2>
      <Temperature temperature={weather.current.temperature} />
      <WeatherIcon
        icon={weather.current.weather_icons[0]}
        description={weather.current.weather_descriptions[0]}
      />
      <Wind
        speed={weather.current.wind_speed}
        direction={weather.current.wind_dir}
      />
    </>
  );
};

const Temperature = ({ temperature }) => (
  <p>
    <b>temperature: </b>
    {temperature} Fahrenheit
  </p>
);

const WeatherIcon = ({ icon, description }) => (
  <img src={icon} alt={`${description} weather icon`} />
);

const Wind = ({ speed, direction }) => (
  <p>
    <b>wind: </b>
    {speed} mph direction {direction}
  </p>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const weatherHook = () => {
    if (results.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${REACT_APP_WEATHER_API_KEY}&query=${results[0].capital}&units=f`
        )
        .then((response) => {
          console.log(response.data);
          setWeather(response.data);
        });
    }
  };

  useEffect(weatherHook, [results]);

  const handleSearch = (event) => {
    let query = event.target.value;
    console.log(query);
    setSearch(query);
    let result = countries.filter((country) =>
      country.name.toUpperCase().includes(query.toUpperCase())
    );
    if (query.length === 0) {
      setResults([]);
    } else if (result.length === 1 && result[0] === results[0]) {
      return;
    } else {
      setResults(result);
    }
  };

  const handleClick = (event) => {
    let value = event.target.value;
    console.log(value);
    let result = countries.filter((country) =>
      country.name.toUpperCase().includes(value.toUpperCase())
    );
    setSearch(value);
    setResults(result);
  };

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Matches results={results} onClick={handleClick} weather={weather} />
    </div>
  );
};

export default App;
