import { AccessPass, Event, Ticket } from "@/interfaces";

const ATTENDANCE_PASS_PREFIX = "attendance-";

const getAccessCode = (eventId: string) => {
  const normalizedId = eventId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return normalizedId.slice(0, 10) || "CONFIRMADO";
};

export const getAttendanceAccessPassId = (eventId: string) => `${ATTENDANCE_PASS_PREFIX}${eventId}`;

export const isAttendanceAccessPassId = (accessPassId: string) => accessPassId.startsWith(ATTENDANCE_PASS_PREFIX);

export const createAttendanceAccessPass = (event: Event): AccessPass => ({
  id: getAttendanceAccessPassId(event.id),
  ticketNumber: `ACC-${getAccessCode(event.id)}`,
  subTotal: 0,
  tax: 0,
  total: 0,
  itemsInOrder: 1,
  isPaid: true,
  paidAt: event.timestamp,
  event,
  status: "confirmed",
  source: "attendance",
});

export const normalizeAccessPasses = (tickets: Ticket[] = [], events: Event[] = []): AccessPass[] => {
  const ticketPasses: AccessPass[] = tickets.map((ticket) => ({
    ...ticket,
    source: "ticket",
  }));

  const ticketEventIds = new Set(ticketPasses.map((ticket) => ticket.event.id));

  const attendancePasses = events
    .filter((event) => (event.hasPaid || event.isAttending) && !ticketEventIds.has(event.id))
    .map(createAttendanceAccessPass);

  return [...ticketPasses, ...attendancePasses];
};

export const findAccessPassById = (
  accessPassId: string,
  tickets: Ticket[] = [],
  events: Event[] = []
): AccessPass | null => {
  const matchedTicket = tickets.find((ticket) => ticket.id === accessPassId);

  if (matchedTicket) {
    return {
      ...matchedTicket,
      source: "ticket",
    };
  }

  if (!isAttendanceAccessPassId(accessPassId)) {
    return null;
  }

  const eventId = accessPassId.slice(ATTENDANCE_PASS_PREFIX.length);
  const matchedEvent = events.find((event) => event.id === eventId && (event.hasPaid || event.isAttending));

  return matchedEvent ? createAttendanceAccessPass(matchedEvent) : null;
};