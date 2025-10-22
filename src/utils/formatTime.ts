export const formatTime = (date: Date) => {
  const dateFromDb = new Date(date);
  return dateFromDb
    .toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace('a. m.', 'AM')
    .replace('p. m.', 'PM');
};