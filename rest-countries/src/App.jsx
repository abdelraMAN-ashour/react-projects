import { useEffect, useState } from "react";
import { FiMoon, FiSun, FiArrowLeft } from "react-icons/fi";
import "./App.css";
import { getCountries } from "./api/countries";
import SearchBar from "./components/SearchBar/SearchBar";
import Filter from "./components/Filter/Filter";
import Card from "./components/Card/Card";
import Loading from "./components/Loading/Loading";
import CardInfo from "./components/CardInfo/CardInfo";
import ErrorMessage from "./components/Error/ErrorMessage";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [region, setRegion] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [curCard, setCurCard] = useState("");

  const filteredCountries = countries.filter((country) => {
    const st = searchCountries.trim().toLocaleLowerCase();
    const ct = country.name.common.toLocaleLowerCase();
    if (region === "All") return ct.includes(st);
    return ct.includes(st) && country.region === region;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);

  useEffect(() => {
    async function handleCountries() {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData.filter(country=>country.cca3!=='ISR'));
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    handleCountries();
  }, []);

  function handleRegion(region) {
    setRegion(region);
  }

  function filterCountries(s) {
    setSearchCountries(s);
  }

  function handleShowCard(code) {
    setCurCard(code);
  }

  return (
    <div className={`container ${theme ? "containerDarkMode" : ""}`}>
      <header>
        <p>Where in the world?</p>
        <button onClick={() => setTheme((oldTheme) => !oldTheme)}>
          <span className="icon">{!theme ? <FiMoon /> : <FiSun />}</span>
          <p className="theme-text">{!theme ? "Dark" : "Light"} Mode</p>
        </button>
      </header>
      <main>
        {!curCard ? (
          <>
            <div className="controls">
              <SearchBar onFilterCountries={filterCountries} curSearch={searchCountries} />
              <Filter onChangeRegion={handleRegion} />
            </div>
            {loading && <Loading message="counties" />}
            {error && <ErrorMessage message={error} />}

            {!loading && !error && (
              <div className="countries">
                {filteredCountries.map((country) => (
                  <Card
                    onShowCard={handleShowCard}
                    key={country.cca3}
                    countryData={country}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <button className="back" onClick={() => setCurCard("")}>
              <span>
                <FiArrowLeft />
              </span>
              <p>Back</p>
            </button>
            <CardInfo country={curCard} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
