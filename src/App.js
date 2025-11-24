import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the home listings and price forecasting
// In a real application, this data would come from a database or API
const mockHomes = [
  { id: 1, location: 'San Francisco, CA', price: '$1,250,000', sqft: 1800, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+1', description: 'A charming 3-bedroom, 2-bathroom home located in a vibrant neighborhood with excellent schools.', forecast: 'Expected to rise 5-7% over the next year.' },
  { id: 2, location: 'Austin, TX', price: '$890,000', sqft: 2200, imageUrl: 'https://placehold.co/400x300/E8F0F8/3B82F6?text=Home+2', description: 'Modern open-concept living with a spacious backyard, perfect for entertaining. Close to downtown.', forecast: 'Steady growth expected due to strong job market.' },
  { id: 3, location: 'Denver, CO', price: '$950,000', sqft: 1950, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+3', description: 'Cozy mountain retreat with breathtaking views. Features a renovated kitchen and a two-car garage.', forecast: 'Price forecast shows continued appreciation in the area.' },
  { id: 4, location: 'Phoenix, AZ', price: '$710,000', sqft: 2500, imageUrl: 'https://placehold.co/400x300/E8F0F8/3B82F6?text=Home+4', description: 'Brand new construction with smart home features and energy-efficient design. Low maintenance yard.', forecast: 'Expected to remain stable with a slight upward trend.' },
  { id: 5, location: 'Charlotte, NC', price: '$620,000', sqft: 2100, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+5', description: 'Suburban home with a family-friendly layout. Features include a finished basement and a sunroom.', forecast: 'Modest price increase projected for the next two years.' },
  { id: 6, location: 'Nashville, TN', price: '$780,000', sqft: 1900, imageUrl: 'https://placehold.co/400x300/E8F0F8/3B82F6?text=Home+6', description: 'Historic home with modern amenities. Located in a walkable neighborhood with unique shops and restaurants.', forecast: 'Strong price appreciation expected in this high-demand market.' },
  { id: 7, location: 'Orlando, FL', price: '$550,000', sqft: 1750, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+7', description: 'Vacation rental potential! Close to theme parks and major attractions. Fully furnished option available.', forecast: 'Price may fluctuate but overall forecast is positive.' },
  { id: 8, location: 'Boise, ID', price: '$490,000', sqft: 1650, imageUrl: 'https://placehold.co/400x300/E8F0F8/3B82F6?text=Home+8', description: 'Quaint bungalow in a quiet area. Perfect for a first-time homebuyer. Recently updated.', forecast: 'Slight increase in value expected over the coming months.' },
  { id: 9, location: 'Raleigh, NC', price: '$680,000', sqft: 2300, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+9', description: 'Spacious home on a large lot with mature trees. Great for a growing family.', forecast: 'Steady and consistent price growth anticipated.' },
  { id: 10, location: 'San Diego, CA', price: '$1,550,000', sqft: 2000, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+10', description: 'Coastal living at its finest. Ocean views from almost every room. Private balcony.', forecast: 'Premium location ensures continued high value.' },
  { id: 11, location: 'Salt Lake City, UT', price: '$740,000', sqft: 2150, imageUrl: 'https://placehold.co/400x300/E8F0F8/3B82F6?text=Home+11', description: 'Contemporary design with a focus on natural light. Located near hiking and skiing.', forecast: 'Strong growth in the tech sector will drive up prices.' },
  { id: 12, location: 'Jacksonville, FL', price: '$480,000', sqft: 1850, imageUrl: 'https://placehold.co/400x300/F0F4F8/3B82F6?text=Home+12', description: 'Well-maintained home in a quiet community. Community pool and tennis courts.', forecast: 'Consistent, stable price growth projected.' },
];

const mockForecastData = [
  { month: 'Jan', price: 100 },
  { month: 'Feb', price: 102 },
  { month: 'Mar', price: 105 },
  { month: 'Apr', price: 107 },
  { month: 'May', price: 110 },
  { month: 'Jun', price: 112 },
  { month: 'Jul', price: 115 },
  { month: 'Aug', price: 117 },
  { month: 'Sep', price: 120 },
  { month: 'Oct', price: 122 },
  { month: 'Nov', price: 125 },
  { month: 'Dec', price: 128 },
];

// Home Card Component
const HomeCard = ({ home, onClick }) => (
  <div 
    onClick={() => onClick(home)}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
  >
    <img src={home.imageUrl} alt={`Home in ${home.location}`} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{home.price}</h3>
      <p className="text-sm text-gray-500">{home.location}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>{home.sqft} sqft</span>
      </div>
    </div>
  </div>
);

// Home List Screen
const HomeListScreen = ({ onHomeClick }) => (
  <div className="p-8">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-blue-700">Starterhomes.ai</h1>
      <h2 className="text-xl font-medium text-gray-600 mt-2">Search your starter home with AI</h2>
    </div>

    {/* Chat AI Section */}
    <div className="w-3/4 max-w-2xl mx-auto mb-12 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex items-center space-x-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <line x1="12" y1="11" x2="12" y2="17"></line>
        <line x1="8" y1="15" x2="8" y2="15"></line>
      </svg>
      <p className="text-gray-700 font-light">Ask me anything about homes, neighborhoods, or the market trends!</p>
    </div>

    {/* Home Listings Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockHomes.map((home) => (
        <HomeCard key={home.id} home={home} onClick={onHomeClick} />
      ))}
    </div>
  </div>
);

// Home Detail Screen
const HomeDetailScreen = ({ home, onBackClick }) => (
  <div className="p-8">
    <div className="flex items-center mb-6">
      <button onClick={onBackClick} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span className="text-sm font-medium">Back to listings</span>
      </button>
    </div>

    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={home.imageUrl} alt={`Home in ${home.location}`} className="w-full rounded-xl shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{home.price}</h1>
          <p className="text-xl text-gray-600 mt-2">{home.location}</p>
          <p className="text-md text-gray-500 mt-1">{home.sqft} sqft</p>
          <p className="text-gray-700 mt-4 leading-relaxed">{home.description}</p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-semibold text-blue-700">Future Price Forecasting</h3>
        <p className="text-lg text-gray-600 mt-2">{home.forecast}</p>
        
        {/* Price Forecast Graph */}
        <div className="w-full h-80 mt-6 bg-gray-50 p-4 rounded-xl shadow-inner">
          <h4 className="text-md font-medium text-gray-700 mb-2">Price Trend (Last 12 Months)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockForecastData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" name="Index Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [selectedHome, setSelectedHome] = useState(null);

  const handleHomeClick = (home) => {
    setSelectedHome(home);
  };

  const handleBackClick = () => {
    setSelectedHome(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {selectedHome ? (
        <HomeDetailScreen home={selectedHome} onBackClick={handleBackClick} />
      ) : (
        <HomeListScreen onHomeClick={handleHomeClick} />
      )}
    </div>
  );
};

export default App;
