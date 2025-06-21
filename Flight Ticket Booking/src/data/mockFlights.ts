import { Flight } from '../types';

export const mockFlights: Flight[] = [
  {
    id: 'fl-001',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-15T08:30:00Z',
        arrivalTime: '2025-06-15T20:45:00Z',
        duration: '7h 15m',
        airline: {
          code: 'BA',
          name: 'British Airways',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/British_Airways_Speedmarque.svg/2560px-British_Airways_Speedmarque.svg.png'
        },
        flightNumber: 'BA112',
        aircraft: 'Boeing 777-300ER'
      }
    ],
    price: {
      amount: 689,
      currency: 'USD'
    },
    seatsAvailable: 42,
    flightClass: 'economy',
    isRefundable: true,
    baggageAllowance: {
      cabin: '1 x 7kg',
      checked: '1 x 23kg'
    }
  },
  {
    id: 'fl-002',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-15T12:15:00Z',
        arrivalTime: '2025-06-16T01:30:00Z',
        duration: '8h 15m',
        airline: {
          code: 'VS',
          name: 'Virgin Atlantic',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Virgin_Atlantic_logo.svg/1200px-Virgin_Atlantic_logo.svg.png'
        },
        flightNumber: 'VS046',
        aircraft: 'Airbus A350-1000'
      }
    ],
    price: {
      amount: 745,
      currency: 'USD'
    },
    seatsAvailable: 18,
    flightClass: 'economy',
    isRefundable: false,
    baggageAllowance: {
      cabin: '1 x 10kg',
      checked: '1 x 23kg'
    }
  },
  {
    id: 'fl-003',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'AMS',
          name: 'Amsterdam Airport Schiphol',
          city: 'Amsterdam',
          country: 'Netherlands'
        },
        departureTime: '2025-06-15T19:05:00Z',
        arrivalTime: '2025-06-16T08:15:00Z',
        duration: '7h 10m',
        airline: {
          code: 'KL',
          name: 'KLM Royal Dutch Airlines',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/2560px-KLM_logo.svg.png'
        },
        flightNumber: 'KL642',
        aircraft: 'Boeing 787-9 Dreamliner'
      },
      {
        departureAirport: {
          code: 'AMS',
          name: 'Amsterdam Airport Schiphol',
          city: 'Amsterdam',
          country: 'Netherlands'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-16T09:30:00Z',
        arrivalTime: '2025-06-16T10:35:00Z',
        duration: '1h 05m',
        airline: {
          code: 'KL',
          name: 'KLM Royal Dutch Airlines',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/2560px-KLM_logo.svg.png'
        },
        flightNumber: 'KL1009',
        aircraft: 'Boeing 737-800'
      }
    ],
    price: {
      amount: 652,
      currency: 'USD'
    },
    seatsAvailable: 9,
    flightClass: 'economy',
    isRefundable: true,
    baggageAllowance: {
      cabin: '1 x 12kg',
      checked: '1 x 23kg'
    }
  },
  {
    id: 'fl-004',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-15T18:45:00Z',
        arrivalTime: '2025-06-16T06:55:00Z',
        duration: '7h 10m',
        airline: {
          code: 'AA',
          name: 'American Airlines',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/American_Airlines_logo_2013.svg/1024px-American_Airlines_logo_2013.svg.png'
        },
        flightNumber: 'AA100',
        aircraft: 'Boeing 777-300ER'
      }
    ],
    price: {
      amount: 712,
      currency: 'USD'
    },
    seatsAvailable: 27,
    flightClass: 'economy',
    isRefundable: false,
    baggageAllowance: {
      cabin: '1 x 10kg',
      checked: '1 x 23kg'
    }
  },
  {
    id: 'fl-005',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-15T22:00:00Z',
        arrivalTime: '2025-06-16T09:55:00Z',
        duration: '6h 55m',
        airline: {
          code: 'DL',
          name: 'Delta Air Lines',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/2560px-Delta_logo.svg.png'
        },
        flightNumber: 'DL4',
        aircraft: 'Airbus A330-900neo'
      }
    ],
    price: {
      amount: 729,
      currency: 'USD'
    },
    seatsAvailable: 15,
    flightClass: 'economy',
    isRefundable: true,
    baggageAllowance: {
      cabin: '1 x 10kg',
      checked: '2 x 23kg'
    }
  },
  {
    id: 'fl-006',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'DUB',
          name: 'Dublin Airport',
          city: 'Dublin',
          country: 'Ireland'
        },
        departureTime: '2025-06-15T21:30:00Z',
        arrivalTime: '2025-06-16T08:45:00Z',
        duration: '6h 15m',
        airline: {
          code: 'EI',
          name: 'Aer Lingus',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Aer_Lingus_logo.svg/1200px-Aer_Lingus_logo.svg.png'
        },
        flightNumber: 'EI104',
        aircraft: 'Airbus A330-300'
      },
      {
        departureAirport: {
          code: 'DUB',
          name: 'Dublin Airport',
          city: 'Dublin',
          country: 'Ireland'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-16T10:15:00Z',
        arrivalTime: '2025-06-16T11:35:00Z',
        duration: '1h 20m',
        airline: {
          code: 'EI',
          name: 'Aer Lingus',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Aer_Lingus_logo.svg/1200px-Aer_Lingus_logo.svg.png'
        },
        flightNumber: 'EI154',
        aircraft: 'Airbus A320'
      }
    ],
    price: {
      amount: 598,
      currency: 'USD'
    },
    seatsAvailable: 8,
    flightClass: 'economy',
    isRefundable: false,
    baggageAllowance: {
      cabin: '1 x 10kg',
      checked: '1 x 23kg'
    }
  },
  {
    id: 'fl-007',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-15T10:00:00Z',
        arrivalTime: '2025-06-15T22:10:00Z',
        duration: '7h 10m',
        airline: {
          code: 'UA',
          name: 'United Airlines',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/United_Airlines_Logo.svg/2560px-United_Airlines_Logo.svg.png'
        },
        flightNumber: 'UA924',
        aircraft: 'Boeing 767-400ER'
      }
    ],
    price: {
      amount: 823,
      currency: 'USD'
    },
    seatsAvailable: 31,
    flightClass: 'premium_economy',
    isRefundable: true,
    baggageAllowance: {
      cabin: '1 x 12kg',
      checked: '2 x 23kg'
    }
  },
  {
    id: 'fl-008',
    segments: [
      {
        departureAirport: {
          code: 'JFK',
          name: 'John F. Kennedy International Airport',
          city: 'New York',
          country: 'USA'
        },
        arrivalAirport: {
          code: 'LHR',
          name: 'Heathrow Airport',
          city: 'London',
          country: 'United Kingdom'
        },
        departureTime: '2025-06-15T21:30:00Z',
        arrivalTime: '2025-06-16T09:20:00Z',
        duration: '6h 50m',
        airline: {
          code: 'BA',
          name: 'British Airways',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/British_Airways_Speedmarque.svg/2560px-British_Airways_Speedmarque.svg.png'
        },
        flightNumber: 'BA178',
        aircraft: 'Boeing 787-10 Dreamliner'
      }
    ],
    price: {
      amount: 1850,
      currency: 'USD'
    },
    seatsAvailable: 12,
    flightClass: 'business',
    isRefundable: true,
    baggageAllowance: {
      cabin: '2 x 12kg',
      checked: '2 x 32kg'
    }
  }
];