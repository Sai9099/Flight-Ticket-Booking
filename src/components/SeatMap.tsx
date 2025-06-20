import React, { useState } from 'react';
import { SeatMap as SeatMapType } from '../types';

interface SeatMapProps {
  seatMap: SeatMapType;
  onSeatSelect: (seat: string) => void;
  selectedSeat?: string;
}

const SeatMap: React.FC<SeatMapProps> = ({ seatMap, onSeatSelect, selectedSeat }) => {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  
  const renderSeat = (row: number, col: string) => {
    const seatId = `${row}${col}`;
    const seat = seatMap.seats.find(s => s.row === row && s.col === col);
    
    if (!seat) return null;
    
    const isSelected = selectedSeat === seatId;
    const isHovered = hoveredSeat === seatId;
    const isAvailable = seat.status === 'available';
    
    let seatClasses = 'w-10 h-10 flex items-center justify-center rounded-md m-1 text-sm cursor-pointer transition-colors';
    
    if (isSelected) {
      seatClasses += ' bg-primary-600 text-white';
    } else if (isHovered && isAvailable) {
      seatClasses += ' bg-primary-200 text-primary-800';
    } else if (isAvailable) {
      if (seat.type === 'premium') {
        seatClasses += ' bg-accent-100 text-accent-800 hover:bg-accent-200';
      } else if (seat.type === 'extra_legroom') {
        seatClasses += ' bg-success-50 text-success-700 hover:bg-success-100';
      } else {
        seatClasses += ' bg-secondary-100 text-secondary-800 hover:bg-secondary-200';
      }
    } else {
      seatClasses += ' bg-secondary-300 text-secondary-500 cursor-not-allowed opacity-50';
    }
    
    return (
      <div
        key={seatId}
        className={seatClasses}
        onClick={() => isAvailable && onSeatSelect(seatId)}
        onMouseEnter={() => setHoveredSeat(seatId)}
        onMouseLeave={() => setHoveredSeat(null)}
      >
        {seatId}
      </div>
    );
  };
  
  // Generate the column headers (A, B, C, etc.)
  const columnHeaders = Array.from({ length: seatMap.cols }, (_, i) => 
    String.fromCharCode(65 + i)
  );
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-scale-in">
      <h3 className="text-lg font-semibold mb-4">Select Your Seat</h3>
      
      <div className="flex justify-center mb-6">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-secondary-100 rounded mr-2"></div>
            <span className="text-sm">Standard</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-success-50 rounded mr-2"></div>
            <span className="text-sm">Extra Legroom</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-accent-100 rounded mr-2"></div>
            <span className="text-sm">Premium</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-secondary-300 rounded mr-2 opacity-50"></div>
            <span className="text-sm">Unavailable</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md py-4 px-2 bg-secondary-50 rounded-lg">
          <div className="text-center mb-4 text-secondary-500 text-sm">FRONT OF AIRCRAFT</div>
          
          {/* Column headers */}
          <div className="flex justify-center mb-2">
            <div className="flex">
              {columnHeaders.map(col => (
                <div key={col} className="w-10 h-10 flex items-center justify-center m-1 text-sm font-medium text-secondary-700">
                  {col}
                </div>
              ))}
            </div>
          </div>
          
          {/* Seat rows */}
          <div className="space-y-1">
            {Array.from({ length: seatMap.rows }, (_, rowIndex) => (
              <div key={rowIndex} className="flex items-center">
                <div className="w-8 text-right pr-2 font-medium text-secondary-700">
                  {rowIndex + 1}
                </div>
                <div className="flex flex-1 justify-center">
                  {columnHeaders.map(col => renderSeat(rowIndex + 1, col))}
                </div>
                <div className="w-8 text-left pl-2 font-medium text-secondary-700">
                  {rowIndex + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedSeat && (
        <div className="text-center">
          <span className="font-medium">Selected seat: </span>
          <span className="text-primary-700 font-semibold">{selectedSeat}</span>
        </div>
      )}
    </div>
  );
};

export default SeatMap;