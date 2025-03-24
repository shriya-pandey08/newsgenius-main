// API configuration
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY';
const RAPIDAPI_HOST = 'daily-fuel-prices-india.p.rapidapi.com';

// Function to fetch fuel prices from the API
export const getFuelPrices = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    };

    const response = await fetch('https://daily-fuel-prices-india.p.rapidapi.com/api/fuel/prices', options);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    // Transform API response to match our app's data structure
    const transformedData = {};
    
    data.forEach(item => {
      transformedData[item.state] = {
        petrol: parseFloat(item.petrolPrice),
        diesel: parseFloat(item.dieselPrice),
        lastUpdated: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching fuel prices:', error);
    
    // Fallback to mock data if API fails
    return {
      Maharashtra: {
        petrol: 106.31,
        diesel: 94.27,
        lastUpdated: new Date().toLocaleString('en-IN')
      },
      Delhi: {
        petrol: 96.72,
        diesel: 89.62,
        lastUpdated: new Date().toLocaleString('en-IN')
      },
      Karnataka: {
        petrol: 101.94,
        diesel: 87.89,
        lastUpdated: new Date().toLocaleString('en-IN')
      },
      'Tamil Nadu': {
        petrol: 102.63,
        diesel: 94.24,
        lastUpdated: new Date().toLocaleString('en-IN')
      },
      Gujarat: {
        petrol: 96.63,
        diesel: 92.38,
        lastUpdated: new Date().toLocaleString('en-IN')
      }
    };
  }
};

// Function to get fuel price for a specific state
export const getStateFuelPrice = async (state) => {
  try {
    const allPrices = await getFuelPrices();
    return allPrices[state] || null;
  } catch (error) {
    throw new Error(`Failed to fetch fuel price for ${state}`);
  }
}; 