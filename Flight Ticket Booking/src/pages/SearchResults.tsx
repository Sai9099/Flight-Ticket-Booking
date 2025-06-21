import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import FlightCard from '../components/FlightCard';
import BookingSteps from '../components/BookingSteps';
import { mockFlights } from '../data/mockFlights';
import { formatDate } from '../utils/formatters';
import { Flight } from '../types';

const SearchResults: React.FC = () => {
  const { searchParams } = useAppContext();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [stopPreference, setStopPreference] = useState<'any' | 'direct' | 'one_stop'>('any');

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setFlights(mockFlights);
      setFilteredFlights(mockFlights);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (flights.length === 0) return;

    let results = [...flights];

    // Filter by price range
    results = results.filter(
      flight => flight.price.amount >= priceRange[0] && flight.price.amount <= priceRange[1]
    );

    // Filter by airlines if any selected
    if (selectedAirlines.length > 0) {
      results = results.filter(flight => 
        selectedAirlines.includes(flight.segments[0].airline.code)
      );
    }

    // Filter by stops
    if (stopPreference === 'direct') {
      results = results.filter(flight => flight.segments.length === 1);
    } else if (stopPreference === 'one_stop') {
      results = results.filter(flight => flight.segments.length === 2);
    }

    // Sort
    results.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price.amount - b.price.amount;
      } else if (sortBy === 'duration') {
        // Simple duration comparison for demo purposes
        return a.segments[0].duration.localeCompare(b.segments[0].duration);
      } else if (sortBy === 'departure') {
        return a.segments[0].departureTime.localeCompare(b.segments[0].departureTime);
      }
      return 0;
    });

    setFilteredFlights(results);
  }, [flights, sortBy, priceRange, selectedAirlines, stopPreference]);

  // Extract all airlines for filter
  const airlines = flights.length > 0 
    ? Array.from(new Set(flights.map(flight => flight.segments[0].airline.code)))
        .map(code => {
          const airline = flights.find(f => f.segments[0].airline.code === code)?.segments[0].airline;
          return airline ? { code, name: airline.name, logo: airline.logo } : null;
        })
        .filter(Boolean)
    : [];

  const toggleAirline = (code: string) => {
    setSelectedAirlines(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code) 
        : [...prev, code]
    );
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSteps />
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-lg text-secondary-600">Searching for the best flights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingSteps />
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">
            {searchParams.from} to {searchParams.to}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
            <div className="flex items-center">
              <span className="font-medium">Depart:</span>
              <span className="ml-1">{formatDate(searchParams.departDate)}</span>
            </div>
            {searchParams.returnDate && (
              <div className="flex items-center">
                <span className="font-medium">Return:</span>
                <span className="ml-1">{formatDate(searchParams.returnDate)}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="font-medium">Passengers:</span>
              <span className="ml-1">{searchParams.passengers}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Class:</span>
              <span className="ml-1">
                {searchParams.flightClass.charAt(0).toUpperCase() + searchParams.flightClass.slice(1).replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
        
        {/* Filters and Results */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters (Mobile) */}
          <div className="lg:hidden w-full">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary-600" />
                <span className="font-medium">Filters</span>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${filterOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {filterOpen && (
              <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                {/* Mobile filters (same as desktop) */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-secondary-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <div className="flex space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e, 0)}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Airlines</h3>
                  <div className="space-y-2">
                    {airlines.map(airline => (
                      <label key={airline?.code} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline?.code || '')}
                          onChange={() => toggleAirline(airline?.code || '')}
                          className="h-4 w-4 text-primary-600 rounded"
                        />
                        <div className="flex items-center">
                          <img src={airline?.logo} alt={airline?.name} className="h-6 w-6 object-contain mr-2" />
                          <span>{airline?.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Stops</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="stops"
                        value="any"
                        checked={stopPreference === 'any'}
                        onChange={() => setStopPreference('any')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span>Any number of stops</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="stops"
                        value="direct"
                        checked={stopPreference === 'direct'}
                        onChange={() => setStopPreference('direct')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span>Direct flights only</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="stops"
                        value="one_stop"
                        checked={stopPreference === 'one_stop'}
                        onChange={() => setStopPreference('one_stop')}
                        className="h-4 w-4 text-primary-600"
                      />
                      <span>1 stop</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Filters (Desktop) */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-secondary-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Airlines</h3>
              <div className="space-y-2">
                {airlines.map(airline => (
                  <label key={airline?.code} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline?.code || '')}
                      onChange={() => toggleAirline(airline?.code || '')}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <div className="flex items-center">
                      <img src={airline?.logo} alt={airline?.name} className="h-6 w-6 object-contain mr-2" />
                      <span>{airline?.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Stops</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    value="any"
                    checked={stopPreference === 'any'}
                    onChange={() => setStopPreference('any')}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span>Any number of stops</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    value="direct"
                    checked={stopPreference === 'direct'}
                    onChange={() => setStopPreference('direct')}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span>Direct flights only</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    value="one_stop"
                    checked={stopPreference === 'one_stop'}
                    onChange={() => setStopPreference('one_stop')}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span>1 stop</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
              <div className="text-secondary-700">
                <span className="font-medium">{filteredFlights.length}</span> flights found
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm text-secondary-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                  className="border border-secondary-300 rounded-md text-sm py-1 pl-2 pr-8 appearance-none bg-white"
                >
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                </select>
                <ArrowUpDown className="h-4 w-4 ml-1 text-secondary-500" />
              </div>
            </div>
            
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No flights found</h3>
                <p className="text-secondary-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFlights.map(flight => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;