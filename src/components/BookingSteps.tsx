import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Circle } from 'lucide-react';

const BookingSteps: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const steps = [
    { name: 'Search', path: '/search', completed: true },
    { name: 'Select Flight', path: '/flight', completed: currentPath.includes('/flight') || currentPath.includes('/passenger-info') || currentPath.includes('/payment') || currentPath.includes('/confirmation') },
    { name: 'Passenger Info', path: '/passenger-info', completed: currentPath.includes('/passenger-info') || currentPath.includes('/payment') || currentPath.includes('/confirmation') },
    { name: 'Payment', path: '/payment', completed: currentPath.includes('/payment') || currentPath.includes('/confirmation') },
    { name: 'Confirmation', path: '/confirmation', completed: currentPath.includes('/confirmation') }
  ];
  
  const currentStepIndex = steps.findIndex(step => 
    step.path === '/' ? currentPath === '/' : currentPath.includes(step.path)
  );
  
  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            {/* Step */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step.completed ? 'bg-primary-100 text-primary-600' : 
                index === currentStepIndex ? 'bg-primary-500 text-white' : 'bg-secondary-100 text-secondary-500'
              }`}>
                {step.completed ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <div className={`mt-2 text-xs font-medium ${
                index === currentStepIndex ? 'text-primary-700' : 'text-secondary-500'
              }`}>
                {step.name}
              </div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-1 bg-secondary-200">
                <div className={`h-full ${step.completed ? 'bg-primary-500' : 'bg-transparent'}`} style={{ width: step.completed ? '100%' : '0%' }}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;