export const formatDuration = (hours: number) => {
  const totalSeconds = Math.floor(hours * 3600);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;
};
