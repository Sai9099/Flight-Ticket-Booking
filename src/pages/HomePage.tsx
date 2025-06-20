import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, Clock, CreditCard, MapPin, ShieldCheck } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import { popularDestinations } from '../data/destinations';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-600 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl animate-slide-down">
              Fly to Your Dreams <br/>With Confidence
            </h1>
            <p className="mt-4 text-xl text-white opacity-90 animate-slide-down" style={{ animationDelay: '100ms' }}>
              Book your next adventure with SkyWay and experience seamless travel planning with the best prices guaranteed.
            </p>
          </div>
          
          <div className="mt-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <SearchForm />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkyWay</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all hover:shadow-lg">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-secondary-600">Find a lower price for the same flight? We'll match it and give you extra credit for your next booking.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all hover:shadow-lg">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-secondary-600">Your personal and payment information is protected with state-of-the-art encryption technology.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all hover:shadow-lg">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-secondary-600">Our dedicated support team is available around the clock to assist you with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <div className="flex items-center mt-4 md:mt-0 text-primary-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="font-medium">Trending Now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.slice(0, 6).map((destination) => (
              <div 
                key={destination.code}
                className="relative h-64 overflow-hidden rounded-xl group cursor-pointer"
              >
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">{destination.city}</h3>
                  <div className="flex items-center text-white/90 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-1 text-white/90" />
                    <span className="text-sm text-white/90">Best time: {destination.bestTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/search" className="btn-primary">
              Explore All Destinations
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 mb-4">"SkyWay made booking my international flight so easy! The interface is intuitive, and I saved over $200 compared to other booking sites."</p>
              <div className="font-medium">Sarah T.</div>
              <div className="text-sm text-secondary-500">Los Angeles, CA</div>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 mb-4">"When my flight was cancelled due to weather, SkyWay's customer service team helped me rebook immediately. Their 24/7 support is truly exceptional!"</p>
              <div className="font-medium">Michael R.</div>
              <div className="text-sm text-secondary-500">Chicago, IL</div>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-600 mb-4">"I've been using SkyWay for all my business trips for the past year. Their seat selection feature and easy booking process save me time and hassle every time."</p>
              <div className="font-medium">Jennifer L.</div>
              <div className="text-sm text-secondary-500">New York, NY</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of satisfied travelers who have discovered the easiest way to book flights online.</p>
          <Link to="/search" className="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-3 text-lg font-medium">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;