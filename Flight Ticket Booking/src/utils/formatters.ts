/**
 * Formats a currency amount with the given currency code
 */
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats a date string into a more readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

/**
 * Formats a time string (from ISO) into a readable time format
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

/**
 * Formats a duration string (e.g., "PT3H20M") into a readable format (e.g., "3h 20m")
 */
export const formatDuration = (durationString: string): string => {
  // For demo purposes, we'll just handle a simple string format
  // In a real app, you'd parse ISO 8601 duration format
  
  // If durationString is already in the format "3h 20m"
  if (/^\d+h \d+m$/.test(durationString)) {
    return durationString;
  }
  
  // Simple parsing for PT3H20M format
  const hours = durationString.match(/(\d+)H/);
  const minutes = durationString.match(/(\d+)M/);
  
  let result = '';
  
  if (hours) {
    result += `${hours[1]}h `;
  }
  
  if (minutes) {
    result += `${minutes[1]}m`;
  }
  
  return result.trim();
};