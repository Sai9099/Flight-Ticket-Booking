import { SeatMap } from '../types';

// Create a mock seat map for demonstration
export const mockSeatMap: SeatMap = {
  rows: 30,
  cols: 6, // A-F
  seats: []
};

// Generate the seat map with different types of seats and availabilities
for (let row = 1; row <= mockSeatMap.rows; row++) {
  for (let colIndex = 0; colIndex < mockSeatMap.cols; colIndex++) {
    const col = String.fromCharCode(65 + colIndex); // Convert 0 -> A, 1 -> B, etc.
    
    let seatType: 'standard' | 'extra_legroom' | 'premium' = 'standard';
    let status: 'available' | 'unavailable' = 'available';
    let price: number | undefined = undefined;
    
    // First 3 rows are premium seats
    if (row <= 3) {
      seatType = 'premium';
      price = 45;
    } 
    // Rows 10-12 are extra legroom (exit rows)
    else if (row >= 10 && row <= 12) {
      seatType = 'extra_legroom';
      price = 25;
    }
    
    // Make some seats unavailable (around 20%)
    if (Math.random() < 0.2) {
      status = 'unavailable';
    }
    
    mockSeatMap.seats.push({
      row,
      col,
      status,
      type: seatType,
      price
    });
  }
}