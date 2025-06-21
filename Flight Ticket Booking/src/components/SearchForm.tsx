import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Users, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { FlightClass } from '../types';
import { popularDestinations } from '../data/destinations';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useAppContext();
  const [formData, setFormData] = useState(searchParams);
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(formData);
    navigate('/search');
  };

  const handleTripTypeChange = (type: 'roundtrip' | 'oneway') => {
    setTripType(type);
    if (type === 'oneway') {
      setFormData(prev => ({ ...prev, returnDate: '' }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            tripType === 'roundtrip' 
              ? 'bg-primary-100 text-primary-800' 
              : 'text-secondary-500 hover:bg-secondary-50'
          }`}
          onClick={() => handleTripTypeChange('roundtrip')}
        >
          Round Trip
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            tripType === 'oneway' 
              ? 'bg-primary-100 text-primary-800' 
              : 'text-secondary-500 hover:bg-secondary-50'
          }`}
          onClick={() => handleTripTypeChange('oneway')}
        >
          One Way
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <label htmlFor="from" className="input-label">From</label>
            <input
              id="from"
              name="from"
              type="text"
              value={formData.from}
              onChange={handleInputChange}
              className="input"
              placeholder="City or airport"
              required
              list="origins"
            />
            <datalist id="origins">
              {popularDestinations.map(dest => (
                <option key={dest.code} value={`${dest.city} (${dest.code})`} />
              ))}
            </datalist>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="to" className="input-label">To</label>
            <div className="relative">
              <input
                id="to"
                name="to"
                type="text"
                value={formData.to}
                onChange={handleInputChange}
                className="input"
                placeholder="City or airport"
                required
                list="destinations"
              />
              <datalist id="destinations">
                {popularDestinations.map(dest => (
                  <option key={dest.code} value={`${dest.city} (${dest.code})`} />
                ))}
              </datalist>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-0 md:-translate-x-[110%]">
                <div className="hidden md:flex h-8 w-8 rounded-full bg-primary-100 items-center justify-center text-primary-600">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="departDate" className="input-label">Departure</label>
            <div className="relative">
              <input
                id="departDate"
                name="departDate"
                type="date"
                value={formData.departDate}
                onChange={handleInputChange}
                className="input"
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="returnDate" className="input-label">Return</label>
            <div className="relative">
              <input
                id="returnDate"
                name="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={handleInputChange}
                className="input"
                disabled={tripType === 'oneway'}
                min={formData.departDate || new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="passengers" className="input-label">Passengers</label>
            <div className="relative">
              <select
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleInputChange}
                className="input appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
              <Users className="absolute right-8 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="flightClass" className="input-label">Class</label>
            <div className="relative">
              <select
                id="flightClass"
                name="flightClass"
                value={formData.flightClass}
                onChange={handleInputChange}
                className="input appearance-none"
              >
                <option value="economy">Economy</option>
                <option value="premium_economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label className="input-label opacity-0">Search</label>
            <button 
              type="submit"
              className="btn-primary w-full h-10"
            >
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;