import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/Clock/Clock";
import DigitalClock from "./components/DigitalClock/DigitalClock";
import TimeZone from "./components/TimeZone/TimeZone";

const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
function App() {
  const [time, setTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState(currentTimeZone);
  const [nightMode, setNightMode] = useState(false);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  function handleChangeTimeZone(timeZone) {
    setTimeZone(timeZone);
  }

  const parts = Object.fromEntries(
    formatter.formatToParts(time).map(({ type, value }) => [type, value]),
  );

  useEffect(() => {
    let incSec = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(incSec);
    };
  }, []);

  const date = {
    month: parts.month,
    day: parts.day,
    year: parts.year,
  };

  const curTime = {
    hours: parts.hour,
    mins: parts.minute,
    secs: parts.second,
    AMPM: parts.dayPeriod,
  };

  const themeStyle = nightMode
    ? {}
    : {
        "--bg-color": "rgb(207, 224, 241)",
        "--bg-light-color": "rgb(223, 224, 226)",
        "--light-text": "rgb(20, 22, 46)",
      };

  return (
    <main style={themeStyle}>
      <button
        className="dark-light"
        onClick={() => setNightMode((old) => !old)}
      >
        {nightMode ? (
          <FaMoon className="icon night-mode" />
        ) : (
          <FaSun className="icon light-mode" />
        )}
      </button>
      <Clock time={curTime} />
      <DigitalClock time={curTime} date={date} />
      <TimeZone
        curTimeZone={timeZone}
        onChangeTimeZone={handleChangeTimeZone}
      />
    </main>
  );
}

export default App;
