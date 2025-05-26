export const formattedDateTime = (isoDate?: string | null): string => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${date.toLocaleDateString('uk-UA')} ${hours}:${minutes}`;
};
