export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays}d`;
  } else if (diffDays > 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}wks`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}mos`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}yrs`;
  }
}
