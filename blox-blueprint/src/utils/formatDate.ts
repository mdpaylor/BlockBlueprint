export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function formatRelativeDay(iso: string): string {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const daysAgo = Math.round(
    (startOfDay(new Date()) - startOfDay(new Date(iso))) / MS_PER_DAY,
  );

  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  return formatDate(iso);
}
