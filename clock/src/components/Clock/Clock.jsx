import classes from "./Clock.module.css";

export default function Clock({ time }) {
  const hours = +time.hours;
  const mins = +time.mins;
  const secs = +time.secs;
  const offset = 90;

  return (
    <section className={classes.circle}>
      <div className={classes.hoursContainer}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={classes.bars}>
        <span
          className={classes.hours}
          style={{
            "--angle": ((hours * 60 + mins) / 720) * 360 - offset + "deg",
          }}
        ></span>
        <span
          className={classes.mins}
          style={{
            "--angle": ((mins * 60 + secs) / 3600) * 360 - offset + "deg",
          }}
        ></span>
        <span
          className={classes.secs}
          style={{
            "--angle": (secs / 60) * 360 - offset + "deg",
            transition: !secs && "transform 0s",
          }}
        ></span>
      </div>
      <span className={classes.barHolder}></span>
    </section>
  );
}
