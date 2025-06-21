import { BookingDetails } from '../types';
import { mockFlights } from './mockFlights';

export const mockBookings: BookingDetails[] = [
  {
    bookingNumber: 'AB1234',
    bookingDate: '2025-03-15T10:30:00Z',
    outboundFlight: mockFlights[0], // Using the first mock flight
    passengers: [
      {
        id: '1',
        type: 'adult',
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1985-05-15',
        nationality: 'US',
        passportNumber: 'P123456789',
        passportExpiry: '2028-08-12',
        seat: '12A'
      },
      {
        id: '2',
        type: 'adult',
        title: 'Mrs',
        firstName: 'Jane',
        lastName: 'Doe',
        dateOfBirth: '1988-09-22',
        nationality: 'US',
        passportNumber: 'P987654321',
        passportExpiry: '2027-04-05',
        seat: '12B'
      }
    ],
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567'
    },
    price: {
      subtotal: 1378,
      taxes: 165.36,
      total: 1543.36,
      currency: 'USD'
    },
    paymentMethod: 'Card ending in 1234',
    status: 'confirmed'
  },
  {
    bookingNumber: 'CD5678',
    bookingDate: '2025-02-28T14:45:00Z',
    outboundFlight: mockFlights[2], // Using the third mock flight
    returnFlight: mockFlights[3], // Using the fourth mock flight as return
    passengers: [
      {
        id: '3',
        type: 'adult',
        title: 'Mr',
        firstName: 'Robert',
        lastName: 'Smith',
        dateOfBirth: '1975-12-10',
        nationality: 'GB',
        passportNumber: 'GBP789123',
        passportExpiry: '2026-11-18',
        seat: '8F'
      }
    ],
    contactInfo: {
      email: 'robert.smith@example.com',
      phone: '+44 7700 900123'
    },
    price: {
      subtotal: 1364,
      taxes: 163.68,
      total: 1527.68,
      currency: 'USD'
    },
    paymentMethod: 'PayPal',
    status: 'confirmed'
  },
  {
    bookingNumber: 'EF9012',
    bookingDate: '2025-04-05T09:15:00Z',
    outboundFlight: mockFlights[5], // Using the sixth mock flight
    passengers: [
      {
        id: '4',
        type: 'adult',
        title: 'Ms',
        firstName: 'Emily',
        lastName: 'Johnson',
        dateOfBirth: '1990-03-24',
        nationality: 'US',
        passportNumber: 'P456123789',
        passportExpiry: '2029-05-30',
        seat: '15C'
      },
      {
        id: '5',
        type: 'child',
        title: 'Miss',
        firstName: 'Olivia',
        lastName: 'Johnson',
        dateOfBirth: '2018-07-12',
        nationality: 'US',
        passportNumber: 'P987321654',
        passportExpiry: '2029-05-30',
        seat: '15D'
      }
    ],
    contactInfo: {
      email: 'emily.johnson@example.com',
      phone: '+1 (555) 987-6543'
    },
    price: {
      subtotal: 1196,
      taxes: 143.52,
      total: 1339.52,
      currency: 'USD'
    },
    paymentMethod: 'Card ending in 5678',
    status: 'pending'
  }
];