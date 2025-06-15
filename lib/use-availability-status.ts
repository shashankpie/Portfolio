import { useState, useEffect } from "react";

export interface AvailabilityStatus {
  text: string;
  color: string;
  pulse: boolean;
  icon: 'dot' | 'away' | 'sleep';
}

export function useAvailabilityStatus(): AvailabilityStatus {
  const [status, setStatus] = useState<AvailabilityStatus>({
    text: "Available",
    color: "bg-green-500",
    pulse: true,
    icon: 'dot'
  });

  const getAvailabilityStatus = (): AvailabilityStatus => {
    const now = new Date();
    const cstHour = parseInt(
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        hour12: false
      }).format(now)
    );

    if (cstHour >= 9 && cstHour < 18) {
      // 9 AM - 6 PM: Available
      return {
        text: "Available",
        color: "bg-green-500",
        pulse: true,
        icon: 'dot'
      };
    } else if (cstHour >= 18 && cstHour < 22) {
      // 6 PM - 10 PM: Away from PC
      return {
        text: "Away from PC",
        color: "bg-yellow-500",
        pulse: false,
        icon: 'away'
      };
    } else {
      // 10 PM - 9 AM: Sleeping
      return {
        text: "Sleeping",
        color: "bg-gray-500",
        pulse: false,
        icon: 'sleep'
      };
    }
  };

  useEffect(() => {
    // Set initial status
    setStatus(getAvailabilityStatus());

    // Update every 15 minutes
    const interval = setInterval(() => {
      setStatus(getAvailabilityStatus());
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  return status;
}