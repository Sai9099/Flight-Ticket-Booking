import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Flight, SearchParams, Passenger, BookingDetails } from '../types';

interface AppContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  selectedFlight: Flight | null;
  setSelectedFlight: React.Dispatch<React.SetStateAction<Flight | null>>;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  bookingDetails: BookingDetails | null;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails | null>>;
}

const initialSearchParams: SearchParams = {
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
  flightClass: 'economy'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <AppContext.Provider 
      value={{
        searchParams,
        setSearchParams,
        selectedFlight,
        setSelectedFlight,
        passengers,
        setPassengers,
        bookingDetails,
        setBookingDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};