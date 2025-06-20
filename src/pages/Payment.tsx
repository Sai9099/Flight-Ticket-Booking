import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, LockKeyhole, Shield, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BookingSteps from '../components/BookingSteps';
import { formatCurrency } from '../utils/formatters';
import { generateBookingNumber } from '../utils/helpers';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { selectedFlight, passengers, searchParams, setBookingDetails } = useAppContext();
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'apple_pay'>('credit_card');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  if (!selectedFlight || !passengers.length) {
    navigate('/');
    return null;
  }
  
  const basePrice = selectedFlight.price.amount;
  const passengerCount = searchParams.passengers;
  const subtotal = basePrice * passengerCount;
  const taxes = subtotal * 0.12; // Assuming 12% taxes and fees
  const total = subtotal + taxes;
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'credit_card') {
      if (!cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!cardName) {
        newErrors.cardName = 'Cardholder name is required';
      }
      
      if (!expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = 'Please use MM/YY format';
      }
      
      if (!cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking details
      const bookingDetails = {
        bookingNumber: generateBookingNumber(),
        bookingDate: new Date().toISOString(),
        outboundFlight: selectedFlight,
        passengers,
        contactInfo: {
          email: 'user@example.com', // This would come from the passenger info form
          phone: '+1234567890'
        },
        price: {
          subtotal,
          taxes,
          total,
          currency: selectedFlight.price.currency
        },
        paymentMethod: paymentMethod === 'credit_card' 
          ? `Card ending in ${cardNumber.slice(-4)}` 
          : paymentMethod === 'paypal' 
            ? 'PayPal' 
            : 'Apple Pay',
        status: 'confirmed' as const
      };
      
      setBookingDetails(bookingDetails);
      navigate('/confirmation');
    }
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setExpiryDate(value);
  };
  
  return (
    <div className="min-h-screen bg-secondary-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingSteps />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payment</h1>
          <p className="text-secondary-600">
            Complete your booking by providing your payment details.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                    paymentMethod === 'credit_card' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Credit Card</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                    paymentMethod === 'paypal' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <span className="font-bold text-blue-600 mr-1">Pay</span>
                  <span className="font-bold text-blue-800">Pal</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center transition-colors ${
                    paymentMethod === 'apple_pay' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <span className="font-medium">Apple Pay</span>
                </button>
              </div>
              
              {paymentMethod === 'credit_card' && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="input-label">Card Number</label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className={`input pl-10 ${errors.cardNumber ? 'border-error-500' : ''}`}
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-error-600">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="input-label">Cardholder Name</label>
                    <input
                      id="cardName"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className={`input ${errors.cardName ? 'border-error-500' : ''}`}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-error-600">{errors.cardName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="input-label">Expiry Date</label>
                      <input
                        id="expiryDate"
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`input ${errors.expiryDate ? 'border-error-500' : ''}`}
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-error-600">{errors.expiryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="input-label">CVV</label>
                      <div className="relative">
                        <input
                          id="cvv"
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          maxLength={4}
                          className={`input ${errors.cvv ? 'border-error-500' : ''}`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <LockKeyhole className="h-4 w-4 text-secondary-400" />
                        </div>
                      </div>
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-error-600">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <Shield className="h-5 w-5 text-success-500 mr-2" />
                    <p className="text-sm text-secondary-600">
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </form>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="text-center p-8 border border-dashed border-secondary-300 rounded-md">
                  <p className="text-secondary-600 mb-3">
                    Click "Complete Payment" to be redirected to PayPal to complete your purchase securely.
                  </p>
                  <div className="font-bold text-xl">
                    <span className="text-blue-600">Pay</span>
                    <span className="text-blue-800">Pal</span>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'apple_pay' && (
                <div className="text-center p-8 border border-dashed border-secondary-300 rounded-md">
                  <p className="text-secondary-600 mb-3">
                    Click "Complete Payment" to use Apple Pay for this transaction.
                  </p>
                  <div className="font-bold text-xl">
                    Apple Pay
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="country" className="input-label">Country</label>
                  <select id="country" className="input">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="input-label">Zip/Postal Code</label>
                  <input id="zipCode" type="text" className="input" placeholder="10001" />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="input-label">Address</label>
                <input id="address" type="text" className="input" placeholder="123 Main St" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="city" className="input-label">City</label>
                  <input id="city" type="text" className="input" placeholder="New York" />
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="state" className="input-label">State/Province</label>
                  <input id="state" type="text" className="input" placeholder="NY" />
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="phone" className="input-label">Phone</label>
                  <input id="phone" type="tel" className="input" placeholder="(555) 123-4567" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="mb-4 pb-4 border-b border-secondary-200">
                <div className="flex justify-between mb-2">
                  <span>Flight</span>
                  <span className="font-medium">{selectedFlight.segments[0].airline.name} {selectedFlight.segments[0].flightNumber}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Route</span>
                  <span className="font-medium">
                    {selectedFlight.segments[0].departureAirport.code} &rarr; {selectedFlight.segments[0].arrivalAirport.code}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers</span>
                  <span className="font-medium">{passengerCount}</span>
                </div>
              </div>
              
              <div className="mb-4 pb-4 border-b border-secondary-200">
                <div className="flex justify-between mb-2">
                  <span>Base Fare ({passengerCount} {passengerCount === 1 ? 'passenger' : 'passengers'})</span>
                  <span>{formatCurrency(subtotal, selectedFlight.price.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>{formatCurrency(taxes, selectedFlight.price.currency)}</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-primary-700">
                  {formatCurrency(total, selectedFlight.price.currency)}
                </span>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Complete Payment
                  </>
                )}
              </button>
              
              <p className="mt-4 text-xs text-center text-secondary-500">
                By completing this payment, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;