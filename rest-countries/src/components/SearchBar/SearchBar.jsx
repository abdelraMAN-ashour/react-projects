import classes from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({onFilterCountries}) {
  return (
    <div className={classes.search}>
      <span className={classes.icon}>
        <FiSearch />
      </span>
      <input
        onChange={(e)=>onFilterCountries(e.target.value)}
        type="text"
        placeholder="Search for a country..."
        aria-label="Search countries"
      />
    </div>
  );
}
