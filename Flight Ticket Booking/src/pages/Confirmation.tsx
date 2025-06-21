import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Download, Share2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails } = useAppContext();
  
  useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);
  
  if (!bookingDetails) {
    return null;
  }
  
  const { outboundFlight, bookingNumber, bookingDate, passengers, price } = bookingDetails;
  const mainSegment = outboundFlight.segments[0];
  
  const handleDownloadTicket = () => {
    alert('E-ticket download functionality would be implemented here.');
  };
  
  const handleShareItinerary = () => {
    alert('Share itinerary functionality would be implemented here.');
  };
  
  return (
    <div className="min-h-screen bg-secondary-50 pt-8 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-slide-down">
          <div className="inline-flex items-center justify-center bg-success-100 text-success-700 rounded-full p-2 mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-secondary-600 text-lg">
            Your flight has been successfully booked. Your booking reference is:
          </p>
          <div className="text-2xl font-bold text-primary-700 mt-2">{bookingNumber}</div>
        </div>
        
        {/* E-Ticket */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-in">
          <div className="bg-primary-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Electronic Ticket</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-secondary-200">
              <div className="mb-4 md:mb-0">
                <div className="text-sm text-secondary-500 mb-1">Airline</div>
                <div className="flex items-center">
                  <img src={mainSegment.airline.logo} alt={mainSegment.airline.name} className="h-8 w-8 mr-2" />
                  <span className="font-medium">{mainSegment.airline.name}</span>
                </div>
              </div>
              
              <div className="mb-4 md:mb-0">
                <div className="text-sm text-secondary-500 mb-1">Flight</div>
                <div className="font-medium">{mainSegment.flightNumber}</div>
              </div>
              
              <div className="mb-4 md:mb-0">
                <div className="text-sm text-secondary-500 mb-1">Class</div>
                <div className="font-medium">
                  {outboundFlight.flightClass.charAt(0).toUpperCase() + outboundFlight.flightClass.slice(1).replace('_', ' ')}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-secondary-500 mb-1">Date</div>
                <div className="font-medium">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {formatDate(mainSegment.departureTime)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-6 border-b border-secondary-200">
              <div className="text-center mb-4 md:mb-0 md:text-left">
                <div className="text-sm text-secondary-500 mb-1">From</div>
                <div className="text-xl font-bold">{mainSegment.departureAirport.code}</div>
                <div className="text-secondary-700">{mainSegment.departureAirport.city}</div>
                <div className="text-secondary-500 flex items-center justify-center md:justify-start">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(mainSegment.departureTime)}
                </div>
              </div>
              
              <div className="flex flex-col items-center py-2">
                <div className="text-xs text-secondary-500 mb-1">{formatDuration(mainSegment.duration)}</div>
                <div className="relative w-20 md:w-40 h-[2px] bg-primary-200 my-2">
                  <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-primary-500 transform -translate-y-1/2"></div>
                </div>
                <div className="text-xs text-secondary-500">
                  {outboundFlight.segments.length > 1 ? `${outboundFlight.segments.length - 1} stop(s)` : 'Direct'}
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-secondary-500 mb-1">To</div>
                <div className="text-xl font-bold">{mainSegment.arrivalAirport.code}</div>
                <div className="text-secondary-700">{mainSegment.arrivalAirport.city}</div>
                <div className="text-secondary-500 flex items-center justify-center md:justify-end">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(mainSegment.arrivalTime)}
                </div>
              </div>
            </div>
            
            <div className="mb-6 pb-6 border-b border-secondary-200">
              <h3 className="font-medium mb-3">Passenger Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {passengers.map((passenger, index) => (
                  <div key={passenger.id} className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-secondary-500 mt-0.5" />
                    <div>
                      <div className="font-medium">
                        {passenger.title} {passenger.firstName} {passenger.lastName}
                      </div>
                      <div className="text-sm text-secondary-500">
                        {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)} • Passport: {passenger.passportNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6 pb-6 border-b border-secondary-200">
              <h3 className="font-medium mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-secondary-500" />
                  <span>{bookingDetails.contactInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-secondary-500" />
                  <span>{bookingDetails.contactInfo.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Payment Information</h3>
              <div className="flex justify-between mb-2">
                <span>Base Fare</span>
                <span>{formatCurrency(price.subtotal, price.currency)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes & Fees</span>
                <span>{formatCurrency(price.taxes, price.currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(price.total, price.currency)}</span>
              </div>
              <div className="text-sm text-secondary-500 mt-2">
                Paid with: {bookingDetails.paymentMethod}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleDownloadTicket}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download E-Ticket
              </button>
              
              <button 
                onClick={handleShareItinerary}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Itinerary
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                  1
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Check-in Online</h3>
                <p className="text-secondary-600">
                  Online check-in opens 24 hours before your flight. You'll receive an email reminder.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                  2
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Prepare Your Documents</h3>
                <p className="text-secondary-600">
                  Make sure to have your passport and booking confirmation ready for the airport.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                  3
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Arrive at the Airport</h3>
                <p className="text-secondary-600">
                  For international flights, arrive 3 hours before departure. For domestic flights, 2 hours is recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;