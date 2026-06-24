import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-07-13T11:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-4 sm:gap-10 justify-center my-16">
      {timeBlocks.map((block, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="font-serif text-4xl sm:text-6xl tabular-nums text-ivory mb-3 drop-shadow-sm">
            {String(block.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] text-burnished-gold/80">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
