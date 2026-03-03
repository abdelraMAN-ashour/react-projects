import { useEffect, useState } from "react";
import classes from "./CardInfo.module.css";
import { getBorders, getCountry } from "../../api/countries";
import Loading from "../Loading/Loading";
import ErrorMessage from "../Error/ErrorMessage";

export default function CardInfo({ country }) {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borders, setBorders] = useState([]);
  const [error, setError] = useState(null);

  const [lat, lng] = countryData?.latlng || [];
  const mapUrl =
    lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : null;

  useEffect(() => {
    async function getCountryData() {
      try {
        const data = await getCountry(country);
        const borderData = data.borders?.length
          ? await getBorders(data.borders.filter((b) => b !== "ISR"))
          : [];
        setCountryData(data);
        setBorders(borderData);
        } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    getCountryData();
  }, [country]);

  return loading ? (
    <Loading message={country} />
  ) : (
    <>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className={classes.container}>
          <img
            src={countryData.flags.svg}
            alt={countryData.flags.alt || `${countryData.name.common} flag`}
          />
          <div className={classes.info}>
            <div className={classes.countryInfo}>
              <h3>{countryData.name.common}</h3>
              <ul>
                <li>
                  <strong>Capital: </strong>
                  {countryData.capital?.join(", ") || "N/A"}
                </li>
                <li>
                  <strong>Region: </strong>
                  {countryData.region}
                </li>
                <li>
                  <strong>Subregion: </strong>
                  {countryData.subregion}
                </li>
                <li>
                  <strong>Top Level Domain: </strong>
                  {countryData.tld?.join(", ") || "N/A"}
                </li>
                <li>
                  <strong>Population: </strong>
                  {countryData.population.toLocaleString()}
                </li>
                <li>
                  <strong>Currencies: </strong>
                  {Object.values(countryData.currencies)
                    .map((c) => c.name)
                    .join(", ")}
                </li>
                <li>
                  <strong>Languages: </strong>
                  {Object.values(countryData.languages).join(", ")}
                </li>
              </ul>
              {mapUrl && (
                <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.mapButton}
                >
                  📍 View on Map
                </a>
              )}
            </div>
            <h3>Borders</h3>
            {!borders.length && <p>NO BORDERS</p>}
            <ul className={classes.border}>
              {borders.map((border) => (
                <li key={border.name.common}>{border.name.common}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
