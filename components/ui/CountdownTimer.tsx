"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

export function CountdownTimer({ targetDate, label = "Registration closes in" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="text-center">
      <p className="text-muted text-sm font-inter mb-3 uppercase tracking-wider">{label}</p>
      <div className="flex justify-center gap-4">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Mins" },
          { value: timeLeft.seconds, label: "Secs" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="bg-surface-high border border-border rounded-lg px-4 py-3 min-w-[70px]">
              <span className="font-rajdhani text-3xl font-bold text-gold-light">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-muted text-xs mt-2 uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
      {isExpired && (
        <p className="text-danger font-rajdhani mt-4 text-lg uppercase tracking-wider">
          Registration Closed
        </p>
      )}
    </div>
  );
}
