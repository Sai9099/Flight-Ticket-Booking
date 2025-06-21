import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Plane, Info, RotateCw, Luggage } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BookingSteps from '../components/BookingSteps';
import SeatMap from '../components/SeatMap';
import { mockFlights } from '../data/mockFlights';
import { mockSeatMap } from '../data/mockSeatMap';
import { formatCurrency, formatTime, formatDuration, formatDate } from '../utils/formatters';
import { Flight } from '../types';

const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedFlight } = useAppContext();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<string | undefined>(undefined);
  const [showSeatMap, setShowSeatMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundFlight = mockFlights.find(f => f.id === id);
      if (foundFlight) {
        setFlight(foundFlight);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const handleSeatSelection = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleContinue = () => {
    if (flight) {
      setSelectedFlight(flight);
      navigate('/passenger-info');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSteps />
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-secondary-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSteps />
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Flight Not Found</h2>
            <p className="text-secondary-600 mb-6">Sorry, we couldn't find the flight you're looking for.</p>
            <button
              onClick={() => navigate('/search')}
              className="btn-primary"
            >
              Back to Search Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  const mainSegment = flight.segments[0];

  return (
    <div className="min-h-screen bg-secondary-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingSteps />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Flight Details</h1>
          <p className="text-secondary-600">
            Review your flight details before proceeding to passenger information.
          </p>
        </div>
        
        {/* Flight Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img
                src={mainSegment.airline.logo}
                alt={mainSegment.airline.name}
                className="h-12 w-12 object-contain"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{mainSegment.airline.name}</h2>
                <p className="text-secondary-600">Flight {mainSegment.flightNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-700">
                {formatCurrency(flight.price.amount, flight.price.currency)}
              </div>
              <p className="text-secondary-500 text-sm">per passenger</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-secondary-200">
            <div className="flex-1">
              <div className="flex items-baseline mb-1">
                <span className="text-3xl font-bold">{formatTime(mainSegment.departureTime)}</span>
                <span className="ml-2 text-secondary-600">{formatDate(mainSegment.departureTime)}</span>
              </div>
              <div className="text-lg font-medium">{mainSegment.departureAirport.code}</div>
              <div className="text-secondary-600">{mainSegment.departureAirport.name}</div>
              <div className="text-secondary-600">{mainSegment.departureAirport.city}, {mainSegment.departureAirport.country}</div>
            </div>
            
            <div className="flex flex-col items-center justify-center py-4 md:py-0">
              <div className="text-secondary-500 mb-2">{formatDuration(mainSegment.duration)}</div>
              <div className="relative w-32 md:w-64 h-[2px] bg-secondary-300 my-2">
                <Plane className="absolute top-1/2 right-0 h-4 w-4 text-primary-600 transform -translate-y-1/2" />
              </div>
              <div className="text-secondary-500 text-sm">
                {flight.segments.length > 1 ? `${flight.segments.length - 1} stop(s)` : 'Direct Flight'}
              </div>
            </div>
            
            <div className="flex-1 text-right">
              <div className="flex items-baseline mb-1 justify-end">
                <span className="text-3xl font-bold">{formatTime(mainSegment.arrivalTime)}</span>
                <span className="ml-2 text-secondary-600">{formatDate(mainSegment.arrivalTime)}</span>
              </div>
              <div className="text-lg font-medium">{mainSegment.arrivalAirport.code}</div>
              <div className="text-secondary-600">{mainSegment.arrivalAirport.name}</div>
              <div className="text-secondary-600">{mainSegment.arrivalAirport.city}, {mainSegment.arrivalAirport.country}</div>
            </div>
          </div>
          
          {/* Flight Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-secondary-200">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-secondary-500 mr-3" />
              <div>
                <div className="font-medium">Flight Duration</div>
                <div className="text-secondary-600">{formatDuration(mainSegment.duration)}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Luggage className="h-5 w-5 text-secondary-500 mr-3" />
              <div>
                <div className="font-medium">Baggage Allowance</div>
                <div className="text-secondary-600">
                  {flight.baggageAllowance.cabin} cabin, {flight.baggageAllowance.checked} checked
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Info className="h-5 w-5 text-secondary-500 mr-3" />
              <div>
                <div className="font-medium">Class</div>
                <div className="text-secondary-600">
                  {flight.flightClass.charAt(0).toUpperCase() + flight.flightClass.slice(1).replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
            <div className="bg-secondary-50 p-4 rounded-md">
              <div className="flex items-center text-secondary-700">
                <RotateCw className="h-5 w-5 mr-2 text-primary-600" />
                {flight.isRefundable ? (
                  <span>This ticket is refundable according to the airline's policy.</span>
                ) : (
                  <span>This ticket is non-refundable.</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Aircraft Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Aircraft</h3>
            <p className="text-secondary-700">{mainSegment.aircraft}</p>
          </div>
        </div>
        
        {/* Seat Selection */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Seat Selection</h2>
            <button 
              onClick={() => setShowSeatMap(!showSeatMap)}
              className="btn-secondary text-sm"
            >
              {showSeatMap ? 'Hide Seat Map' : 'Show Seat Map'}
            </button>
          </div>
          
          {showSeatMap ? (
            <SeatMap 
              seatMap={mockSeatMap} 
              onSeatSelect={handleSeatSelection} 
              selectedSeat={selectedSeat}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-secondary-700 mb-4">
                Click the button above to view the seat map and select your preferred seat.
              </p>
              {selectedSeat && (
                <div className="bg-primary-50 text-primary-700 p-3 rounded-md inline-block">
                  Your selected seat: <span className="font-semibold">{selectedSeat}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Continue Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleContinue}
            className="btn-primary px-8 py-3"
          >
            Continue to Passenger Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;