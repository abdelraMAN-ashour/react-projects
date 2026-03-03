import classes from "./Loading.module.css";

export default function Loading({message}) {
  return (
    <div className={classes.loading}>
      <div className={classes.spinner}></div>
      <p>Loading {message}...</p>
    </div>
  );
}