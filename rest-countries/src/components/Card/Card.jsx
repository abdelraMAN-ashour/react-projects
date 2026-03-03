import classes from "./Card.module.css";

export default function Card({ countryData: country, onShowCard }) {
  return (
    <button
      type="button"
      className={classes.card}
      onClick={() => onShowCard(country.cca3)}
    >
      <img
        src={country.flags.png}
        alt={country.flags.alt || `${country.name.common} flag`}
      />
      <div className={classes.data}>
        <h3>{country.name.common}</h3>
        <p>
          <strong>Population: </strong>
          {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region: </strong>
          {country.region}
        </p>
        <p>
          <strong>Capital: </strong>
          {country.capital?.[0] || "N/A"}
        </p>
      </div>
    </button>
  );
}
