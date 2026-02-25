import classes from "./DigitalClock.module.css";

export default function DigitalClock({ time, date }) {

  const hours = time.hours;
  const mins = time.mins;
  const secs = time.secs;
  const AMPM = time.AMPM;

  return (
    <section className={classes.container}>
      <div>
        <p className={classes.time}>
          {hours}:{mins}:{secs}
        </p>
        <p className={classes.AMPM}>{AMPM}</p>
      </div>
      <div className={classes.date}>
        {date.month} {date.day},{date.year}
      </div>
    </section>
  );
}
