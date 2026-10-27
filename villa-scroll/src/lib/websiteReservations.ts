import { HOTEL_SUITES, PAYMENT_METHODS, PaymentMethod } from "@/data/hotelData";

export type BookingStatus =
  | "checked-in"
  | "vip-arriving"
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

export type PaymentStatus = "paid" | "partial" | "pending";

export interface WebsiteReservation {
  source: "website";
  id: string;
  registeredAt: string;
  guestName: string;
  guestEmail: string;
  phone: string;
  vipTier: string;
  suiteId: string;
  suiteName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  specialRequests: string;
  assignedButler: string;
  arrivalMethod: string;
  addons: string[];
}

const STORAGE_KEY = "aura-sanctuary:website-reservations";
const CHANGE_EVENT = "aura-sanctuary:website-reservations-changed";

function isWebsiteReservation(value: unknown): value is WebsiteReservation {
  if (!value || typeof value !== "object") return false;
  const reservation = value as Partial<WebsiteReservation>;
  const suiteIds = new Set(HOTEL_SUITES.map((suite) => suite.id));

  return (
    reservation.source === "website" &&
    typeof reservation.id === "string" &&
    reservation.id.length > 0 &&
    typeof reservation.registeredAt === "string" &&
    !Number.isNaN(Date.parse(reservation.registeredAt)) &&
    typeof reservation.guestName === "string" &&
    reservation.guestName.trim().length > 0 &&
    typeof reservation.guestEmail === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservation.guestEmail) &&
    typeof reservation.phone === "string" &&
    typeof reservation.vipTier === "string" &&
    typeof reservation.suiteId === "string" &&
    suiteIds.has(reservation.suiteId) &&
    typeof reservation.suiteName === "string" &&
    typeof reservation.checkIn === "string" &&
    typeof reservation.checkOut === "string" &&
    Date.parse(reservation.checkOut) > Date.parse(reservation.checkIn) &&
    typeof reservation.nights === "number" &&
    reservation.nights > 0 &&
    typeof reservation.guests === "number" &&
    reservation.guests > 0 &&
    (reservation.status === "pending" ||
      reservation.status === "confirmed" ||
      reservation.status === "checked-in" ||
      reservation.status === "vip-arriving" ||
      reservation.status === "completed" ||
      reservation.status === "cancelled") &&
    typeof reservation.totalAmount === "number" &&
    Number.isFinite(reservation.totalAmount) &&
    reservation.totalAmount > 0 &&
    (reservation.paymentStatus === "pending" ||
      reservation.paymentStatus === "partial" ||
      reservation.paymentStatus === "paid") &&
    PAYMENT_METHODS.some((method) => method === reservation.paymentMethod) &&
    typeof reservation.specialRequests === "string" &&
    typeof reservation.assignedButler === "string" &&
    typeof reservation.arrivalMethod === "string" &&
    Array.isArray(reservation.addons) &&
    reservation.addons.every((addon) => typeof addon === "string")
  );
}

export function readWebsiteReservations(): WebsiteReservation[] {
  const storedReservations = window.localStorage.getItem(STORAGE_KEY);
  if (storedReservations === null) return [];

  const parsed: unknown = JSON.parse(storedReservations);
  if (!Array.isArray(parsed)) {
    throw new Error("Stored website reservations must be a list.");
  }

  return parsed.filter(isWebsiteReservation);
}

export function saveWebsiteReservations(reservations: WebsiteReservation[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToWebsiteReservations(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
