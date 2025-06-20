import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BookingSteps from '../components/BookingSteps';
import { generateUniqueId } from '../utils/helpers';
import { Passenger } from '../types';

const PassengerInfo: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, selectedFlight, setPassengers } = useAppContext();
  const [formData, setFormData] = useState<Passenger[]>([]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Initialize form data based on number of passengers
    if (searchParams.passengers > 0 && formData.length === 0) {
      const initialPassengers = Array.from({ length: searchParams.passengers }, (_, i) => ({
        id: generateUniqueId(),
        type: i === 0 ? 'adult' : (i < searchParams.passengers - 1 ? 'adult' : 'child'),
        title: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
        specialRequests: []
      }));
      setFormData(initialPassengers);
    }
  }, [searchParams.passengers, formData.length]);

  const validateForm = () => {
    const errors: Record<string, string[]> = {};
    
    // Validate contact info
    if (!contactEmail) {
      errors.contactEmail = ['Email is required'];
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      errors.contactEmail = ['Please enter a valid email address'];
    }
    
    if (!contactPhone) {
      errors.contactPhone = ['Phone number is required'];
    }
    
    // Validate passenger info
    formData.forEach((passenger, index) => {
      const passengerErrors: string[] = [];
      
      if (!passenger.title) passengerErrors.push('Title is required');
      if (!passenger.firstName) passengerErrors.push('First name is required');
      if (!passenger.lastName) passengerErrors.push('Last name is required');
      if (!passenger.dateOfBirth) passengerErrors.push('Date of birth is required');
      if (!passenger.nationality) passengerErrors.push('Nationality is required');
      
      // For international flights, passport would be required
      if (!passenger.passportNumber) passengerErrors.push('Passport number is required');
      if (!passenger.passportExpiry) passengerErrors.push('Passport expiry date is required');
      
      if (passengerErrors.length > 0) {
        errors[`passenger${index}`] = passengerErrors;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updatedPassengers = [...formData];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setFormData(updatedPassengers);
  };

  const handleSpecialRequest = (index: number, request: string, checked: boolean) => {
    const updatedPassengers = [...formData];
    const currentRequests = updatedPassengers[index].specialRequests || [];
    
    if (checked) {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        specialRequests: [...currentRequests, request]
      };
    } else {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        specialRequests: currentRequests.filter(r => r !== request)
      };
    }
    
    setFormData(updatedPassengers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setPassengers(formData);
      navigate('/payment');
    } else {
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (!selectedFlight) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingSteps />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Passenger Information</h1>
          <p className="text-secondary-600">
            Please provide accurate information for all passengers as it appears on official ID documents.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" id="contactInfo">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-secondary-600 mb-6">
              We'll use this information to send your e-ticket and flight updates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className="input-label">Email Address*</label>
                <input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`input ${validationErrors.contactEmail ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  placeholder="email@example.com"
                />
                {validationErrors.contactEmail && (
                  <div className="text-error-600 text-sm mt-1">{validationErrors.contactEmail[0]}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="input-label">Phone Number*</label>
                <input
                  id="contactPhone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className={`input ${validationErrors.contactPhone ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
                {validationErrors.contactPhone && (
                  <div className="text-error-600 text-sm mt-1">{validationErrors.contactPhone[0]}</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Passenger Forms */}
          {formData.map((passenger, index) => (
            <div 
              key={passenger.id} 
              className="bg-white rounded-lg shadow-md p-6 mb-8"
              id={`passenger${index}`}
            >
              <h2 className="text-xl font-semibold mb-4">
                Passenger {index + 1} {index === 0 ? '(Primary)' : ''}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor={`title-${index}`} className="input-label">Title*</label>
                  <select
                    id={`title-${index}`}
                    value={passenger.title}
                    onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('Title is required') ? 'border-error-500' : ''}`}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor={`firstName-${index}`} className="input-label">First Name*</label>
                  <input
                    id={`firstName-${index}`}
                    type="text"
                    value={passenger.firstName}
                    onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('First name is required') ? 'border-error-500' : ''}`}
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label htmlFor={`lastName-${index}`} className="input-label">Last Name*</label>
                  <input
                    id={`lastName-${index}`}
                    type="text"
                    value={passenger.lastName}
                    onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('Last name is required') ? 'border-error-500' : ''}`}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor={`dateOfBirth-${index}`} className="input-label">Date of Birth*</label>
                  <input
                    id={`dateOfBirth-${index}`}
                    type="date"
                    value={passenger.dateOfBirth}
                    onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('Date of birth is required') ? 'border-error-500' : ''}`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label htmlFor={`nationality-${index}`} className="input-label">Nationality*</label>
                  <select
                    id={`nationality-${index}`}
                    value={passenger.nationality}
                    onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('Nationality is required') ? 'border-error-500' : ''}`}
                  >
                    <option value="">Select Nationality</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="IN">India</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
                
                <div>
                  <label htmlFor={`type-${index}`} className="input-label">Passenger Type*</label>
                  <select
                    id={`type-${index}`}
                    value={passenger.type}
                    onChange={(e) => handlePassengerChange(index, 'type', e.target.value)}
                    className="input"
                  >
                    <option value="adult">Adult (12+ years)</option>
                    <option value="child">Child (2-11 years)</option>
                    <option value="infant">Infant (under 2 years)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor={`passportNumber-${index}`} className="input-label">Passport Number*</label>
                  <input
                    id={`passportNumber-${index}`}
                    type="text"
                    value={passenger.passportNumber}
                    onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('Passport number is required') ? 'border-error-500' : ''}`}
                    placeholder="123456789"
                  />
                </div>
                
                <div>
                  <label htmlFor={`passportExpiry-${index}`} className="input-label">Passport Expiry Date*</label>
                  <input
                    id={`passportExpiry-${index}`}
                    type="date"
                    value={passenger.passportExpiry}
                    onChange={(e) => handlePassengerChange(index, 'passportExpiry', e.target.value)}
                    className={`input ${validationErrors[`passenger${index}`]?.includes('Passport expiry date is required') ? 'border-error-500' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Special Requests (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passenger.specialRequests?.includes('wheelchair') || false}
                      onChange={(e) => handleSpecialRequest(index, 'wheelchair', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span>Wheelchair Assistance</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passenger.specialRequests?.includes('vegetarian') || false}
                      onChange={(e) => handleSpecialRequest(index, 'vegetarian', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span>Vegetarian Meal</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passenger.specialRequests?.includes('extra_legroom') || false}
                      onChange={(e) => handleSpecialRequest(index, 'extra_legroom', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span>Extra Legroom</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passenger.specialRequests?.includes('infant') || false}
                      onChange={(e) => handleSpecialRequest(index, 'infant', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span>Traveling with Infant</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passenger.specialRequests?.includes('medical') || false}
                      onChange={(e) => handleSpecialRequest(index, 'medical', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span>Medical Assistance</span>
                  </label>
                </div>
              </div>
              
              {validationErrors[`passenger${index}`] && (
                <div className="bg-error-50 text-error-700 p-3 rounded-md">
                  <p className="font-medium">Please correct the following errors:</p>
                  <ul className="list-disc list-inside text-sm mt-1">
                    {validationErrors[`passenger${index}`].map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          
          {/* Submit Button */}
          <div className="flex justify-between">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Back
            </button>
            
            <button 
              type="submit"
              className="btn-primary px-8 py-3"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassengerInfo;