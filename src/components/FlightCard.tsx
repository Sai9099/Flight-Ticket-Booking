import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Luggage, RotateCw } from 'lucide-react';
import { Flight } from '../types';
import { formatCurrency, formatTime, formatDuration } from '../utils/formatters';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate();
  const segment = flight.segments[0]; // For display purposes, show the first segment

  const handleSelect = () => {
    navigate(`/flight/${flight.id}`);
  };

  const formatClassLabel = (flightClass: string) => {
    switch (flightClass) {
      case 'economy': return 'Economy';
      case 'premium_economy': return 'Premium Economy';
      case 'business': return 'Business';
      case 'first': return 'First Class';
      default: return flightClass;
    }
  };

  return (
    <div className="card p-4 mb-4 transition-all hover:translate-y-[-2px] animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        {/* Airline & Flight Info */}
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src={segment.airline.logo}
            alt={segment.airline.name}
            className="w-12 h-12 object-contain rounded"
          />
          <div className="ml-3">
            <div className="font-medium text-secondary-900">{segment.airline.name}</div>
            <div className="text-sm text-secondary-500">Flight {segment.flightNumber}</div>
          </div>
        </div>

        {/* Flight Times */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="text-right">
            <div className="font-semibold text-lg">{formatTime(segment.departureTime)}</div>
            <div className="text-sm text-secondary-500">{segment.departureAirport.code}</div>
          </div>
          
          <div className="flex flex-col items-center px-4">
            <div className="text-xs text-secondary-500 mb-1">{formatDuration(segment.duration)}</div>
            <div className="relative w-20 h-[2px] bg-secondary-300">
              <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-secondary-500 transform -translate-y-1/2"></div>
            </div>
            <div className="text-xs text-secondary-500 mt-1">
              {flight.segments.length > 1 ? `${flight.segments.length - 1} stop(s)` : 'Direct'}
            </div>
          </div>
          
          <div>
            <div className="font-semibold text-lg">{formatTime(segment.arrivalTime)}</div>
            <div className="text-sm text-secondary-500">{segment.arrivalAirport.code}</div>
          </div>
        </div>

        {/* Features & Price */}
        <div className="flex flex-col md:items-end">
          <div className="flex items-center space-x-2 mb-2">
            <span className="badge-blue">{formatClassLabel(flight.flightClass)}</span>
            {flight.isRefundable && <span className="badge-green flex items-center"><RotateCw className="h-3 w-3 mr-1" /> Refundable</span>}
          </div>
          
          <div className="flex items-center text-sm text-secondary-600 mb-3">
            <Luggage className="h-4 w-4 mr-1" />
            <span>{flight.baggageAllowance.checked}</span>
            
            <Clock className="h-4 w-4 ml-3 mr-1" />
            <span>{formatDuration(segment.duration)}</span>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-primary-700">{formatCurrency(flight.price.amount, flight.price.currency)}</span>
            <span className="text-sm text-secondary-500 ml-1">/ person</span>
          </div>
          
          <button 
            onClick={handleSelect} 
            className="mt-3 btn-primary"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;