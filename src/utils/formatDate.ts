export const formatDate = (date: Date) => {
  const dateFromDb = new Date(date);
  return dateFromDb.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
