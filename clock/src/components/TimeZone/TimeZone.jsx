import classes from "./TimeZone.module.css";
import TIMEZONES from "./timeZoneData.js";

const sortedTimeZones = TIMEZONES.map((tz) => {
  const label = tz.split("/").slice(1).join(" ").replaceAll("_", " ");

  return [tz, label];
}).sort((a, b) => a[1].localeCompare(b[1]));

export default function TimeZone({ onChangeTimeZone, curTimeZone }) {
  return (
    <section className={classes.container}>
      <select
        value={curTimeZone}
        onChange={(e) => {
          onChangeTimeZone(e.target.value);
        }}
      >
        {sortedTimeZones.map((tz) => (
          <option key={tz[0]} value={tz[0]}>
            {tz[1]}
          </option>
        ))}
      </select>
    </section>
  );
}
