import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function Clock() {
  const [time, setTime] = useState(dayjs().format("DD-MM-YYYY HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("DD-MM-YYYY HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{time}</div>;
}

export default Clock;
