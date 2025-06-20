import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, Plane, ChevronDown, ChevronUp, Download, XCircle } from 'lucide-react';
import { mockBookings } from '../data/mockBookings';
import { formatDate, formatTime } from '../utils/formatters';
import { BookingDetails } from '../types';

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const [bookingReference, setBookingReference] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchResults, setSearchResults] = useState<BookingDetails[]>([]);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple search logic for demonstration
    const results = mockBookings.filter(booking => 
      (bookingReference === '' || booking.bookingNumber.toLowerCase().includes(bookingReference.toLowerCase())) &&
      (lastName === '' || booking.passengers.some(p => p.lastName.toLowerCase().includes(lastName.toLowerCase())))
    );
    
    setSearchResults(results);
    setSearchPerformed(true);
    
    // Hide the search form on mobile after search
    if (window.innerWidth < 768) {
      setShowSearchForm(false);
    }
  };
  
  const toggleBookingDetails = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };
  
  return (
    <div className="min-h-screen bg-secondary-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-secondary-600">
            View, manage, or retrieve your flight bookings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <div className="mb-4 lg:hidden">
              <button
                onClick={() => setShowSearchForm(!showSearchForm)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary-600" />
                  <span className="font-medium">Search Bookings</span>
                </div>
                {showSearchForm ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            <div className={`bg-white rounded-lg shadow-md p-6 ${showSearchForm ? 'block' : 'hidden lg:block'}`}>
              <h2 className="text-xl font-semibold mb-4">Find Your Booking</h2>
              
              <form onSubmit={handleSearch}>
                <div className="mb-4">
                  <label htmlFor="bookingReference" className="input-label">Booking Reference</label>
                  <input
                    id="bookingReference"
                    type="text"
                    value={bookingReference}
                    onChange={(e) => setBookingReference(e.target.value)}
                    className="input"
                    placeholder="e.g. ABC123"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="lastName" className="input-label">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                    placeholder="e.g. Smith"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Bookings
                </button>
              </form>
              
              <div className="mt-6 text-center text-sm text-secondary-600">
                <p>Need help with your booking?</p>
                <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">
                  Contact Customer Support
                </a>
              </div>
            </div>
          </div>
          
          {/* Search Results */}
          <div className="lg:col-span-2">
            {!searchPerformed ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Plane className="h-16 w-16 mx-auto text-secondary-300 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Search Performed</h2>
                <p className="text-secondary-600 mb-4">
                  Enter your booking reference or last name to find your reservations.
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <XCircle className="h-16 w-16 mx-auto text-secondary-300 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
                <p className="text-secondary-600 mb-4">
                  We couldn't find any bookings matching your search criteria.
                </p>
                <button 
                  onClick={() => {
                    setBookingReference('');
                    setLastName('');
                    setSearchPerformed(false);
                    setShowSearchForm(true);
                  }}
                  className="btn-secondary"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map(booking => (
                  <div key={booking.bookingNumber} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Booking Summary */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-secondary-50"
                      onClick={() => toggleBookingDetails(booking.bookingNumber)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center mb-3 md:mb-0">
                          <img 
                            src={booking.outboundFlight.segments[0].airline.logo} 
                            alt={booking.outboundFlight.segments[0].airline.name} 
                            className="h-10 w-10 mr-3"
                          />
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{booking.outboundFlight.segments[0].departureAirport.code}</span>
                              <span className="mx-2">→</span>
                              <span className="font-medium">{booking.outboundFlight.segments[0].arrivalAirport.code}</span>
                            </div>
                            <div className="text-sm text-secondary-500">
                              <Calendar className="inline h-4 w-4 mr-1" />
                              {formatDate(booking.outboundFlight.segments[0].departureTime)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="text-sm text-secondary-500">Status</div>
                            <div className={`font-medium ${
                              booking.status === 'confirmed' 
                                ? 'text-success-700' 
                                : booking.status === 'pending' 
                                ? 'text-warning-700' 
                                : 'text-error-700'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                          </div>
                          
                          <div className="mr-2">
                            <div className="text-sm text-secondary-500">Booking Ref</div>
                            <div className="font-medium">{booking.bookingNumber}</div>
                          </div>
                          
                          {expandedBooking === booking.bookingNumber ? (
                            <ChevronUp className="h-5 w-5 text-secondary-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-secondary-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Booking Details */}
                    {expandedBooking === booking.bookingNumber && (
                      <div className="border-t border-secondary-200 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-medium mb-3">Flight Details</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm text-secondary-500 mb-1">Departure</div>
                                <div className="flex items-baseline">
                                  <span className="text-lg font-semibold">
                                    {formatTime(booking.outboundFlight.segments[0].departureTime)}
                                  </span>
                                  <span className="ml-2 text-secondary-500">
                                    {formatDate(booking.outboundFlight.segments[0].departureTime)}
                                  </span>
                                </div>
                                <div className="text-secondary-700">
                                  {booking.outboundFlight.segments[0].departureAirport.name}
                                </div>
                                <div className="text-secondary-500">
                                  {booking.outboundFlight.segments[0].departureAirport.city}, 
                                  {booking.outboundFlight.segments[0].departureAirport.country}
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-sm text-secondary-500 mb-1">Arrival</div>
                                <div className="flex items-baseline">
                                  <span className="text-lg font-semibold">
                                    {formatTime(booking.outboundFlight.segments[0].arrivalTime)}
                                  </span>
                                  <span className="ml-2 text-secondary-500">
                                    {formatDate(booking.outboundFlight.segments[0].arrivalTime)}
                                  </span>
                                </div>
                                <div className="text-secondary-700">
                                  {booking.outboundFlight.segments[0].arrivalAirport.name}
                                </div>
                                <div className="text-secondary-500">
                                  {booking.outboundFlight.segments[0].arrivalAirport.city}, 
                                  {booking.outboundFlight.segments[0].arrivalAirport.country}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-3">Passengers</h3>
                            <div className="space-y-2">
                              {booking.passengers.map(passenger => (
                                <div key={passenger.id} className="flex justify-between">
                                  <span>
                                    {passenger.title} {passenger.firstName} {passenger.lastName}
                                  </span>
                                  <span className="text-secondary-500">
                                    {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <button className="btn-primary flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download E-Ticket
                          </button>
                          
                          <button className="btn-secondary flex items-center">
                            Manage Booking
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;