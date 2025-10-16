export const formatTime = (date: Date) => {
  return date
    .toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace('a. m.', 'AM')
    .replace('p. m.', 'PM');
};