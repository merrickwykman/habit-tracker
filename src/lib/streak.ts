function daysBetween(older: string, newer: string): number {
  const msPerDay = 86_400_000;
  return Math.round(
    (Date.parse(newer) - Date.parse(older)) / msPerDay
  );
}

// dates: ISO date strings sorted descending (newest first)
// today: ISO date string for the current day
// Grace period: one missed day (gap of 2) is allowed between any two logged days.
export function calculateStreak(dates: string[], today: string): number {
  if (dates.length === 0) return 0;

  let streak = 0;
  let cursor = today;

  for (const date of dates) {
    const gap = daysBetween(date, cursor);
    if (gap <= 2) {
      streak++;
      cursor = date;
    } else {
      break;
    }
  }

  return streak;
}
