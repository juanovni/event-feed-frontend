export function combineDateAndTime(dateStr: string, timeStr: string): Date {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida. Usa un valor de fecha válido.");
  }

  const [hours, minutes] = timeStr.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Hora inválida. Usa el formato HH:mm");
  }

  date.setHours(hours, minutes, 0, 0);

  return date;
}