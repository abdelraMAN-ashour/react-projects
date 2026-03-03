import { useEffect, useRef, useState } from "react";
import { continents } from "./continents";
import classes from "./Filter.module.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Filter({ onChangeRegion ,curRegion }) {
  const [showFilter, setShowFilter] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.filter} ref={menuRef}>
      <button onClick={() => setShowFilter((old) => !old)} type="button">
        <p>{curRegion==='All'?'Filter by Region':curRegion}</p>
        <span>{showFilter ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      <ul
        className={`${classes.continents} ${showFilter ? classes.showFilter : ""}`}
      >
        {continents.map((continent) => {
          return (
            <li key={continent.code}>
              <button
                onClick={() => {
                  onChangeRegion(continent.name);
                  setShowFilter(false);
                }}
              >
                {continent.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
