export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export type FlightClass = 'economy' | 'premium_economy' | 'business' | 'first';

export interface SearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  flightClass: FlightClass;
}

export interface FlightSegment {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  airline: Airline;
  flightNumber: string;
  aircraft: string;
}

export interface Flight {
  id: string;
  segments: FlightSegment[];
  price: {
    amount: number;
    currency: string;
  };
  seatsAvailable: number;
  flightClass: FlightClass;
  isRefundable: boolean;
  baggageAllowance: {
    cabin: string;
    checked: string;
  };
}

export interface SeatMap {
  rows: number;
  cols: number;
  seats: {
    row: number;
    col: string;
    status: 'available' | 'unavailable' | 'selected';
    price?: number;
    type?: 'standard' | 'extra_legroom' | 'premium';
  }[];
}

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  seat?: string;
  specialRequests?: string[];
}

export interface BookingDetails {
  bookingNumber: string;
  bookingDate: string;
  outboundFlight: Flight;
  returnFlight?: Flight;
  passengers: Passenger[];
  contactInfo: {
    email: string;
    phone: string;
  };
  price: {
    subtotal: number;
    taxes: number;
    total: number;
    currency: string;
  };
  paymentMethod: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}