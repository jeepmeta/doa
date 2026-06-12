import { useEffect, useState } from "react";

export function useLast24Hours() {
  const generateHours = () => {
    const now = new Date();
    const hours: string[] = [];

    for (let i = 0; i < 24; i++) {
      const d = new Date(now);
      // Set to current hour minus i, then snap minutes/seconds to 0
      d.setHours(now.getHours() - i);
      d.setMinutes(0, 0, 0); 
      
      hours.push(
        d.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit", // This will now always result in ":00"
        })
      );
    }

    return hours;
  };

  const [timestamps, setTimestamps] = useState<string[]>(generateHours());

  useEffect(() => {
    const now = new Date();
    // Calculate ms until the start of the next hour
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60_000 - (now.getSeconds() * 1000);

    const timeout = setTimeout(() => {
      // Run immediately on the hour
      setTimestamps(generateHours());

      // Then set the interval to run every hour on the hour
      const interval = setInterval(() => {
        setTimestamps(generateHours());
      }, 60 * 60 * 1000);

      return () => clearInterval(interval);
    }, msUntilNextHour);

    return () => clearTimeout(timeout);
  }, []);

  return timestamps;
}