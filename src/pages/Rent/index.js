import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock rental listings data with expanded fields
const mockRentals = [
  {
    id: 1, location: 'Austin, TX', rent: '$2,450', beds: 3, baths: 2, sqft: 1400, type: 'House',
    imageUrl: 'https://placehold.co/400x300/EEF2FF/4F46E5?text=Rental+1',
    description: 'Charming 3-bed house in East Austin. Hardwood floors, updated kitchen, fenced backyard. Pet-friendly with a large patio for entertaining.',
    lease: '12 months', available: 'Available Now',
    amenities: ['Washer/Dryer', 'Garage', 'Fenced Yard', 'Pet Friendly'],
    yearBuilt: 1998, petPolicy: 'Cats & dogs allowed, $50/mo pet rent', parking: '2-car garage included',
    utilities: 'Tenant pays all utilities', deposit: '$2,450',
    rooms: [
      { name: 'Primary Bedroom', sqft: 220, dimensions: '14 x 16' },
      { name: 'Bedroom 2', sqft: 150, dimensions: '12 x 12' },
      { name: 'Bedroom 3', sqft: 130, dimensions: '10 x 13' },
      { name: 'Kitchen', sqft: 180, dimensions: '12 x 15' },
      { name: 'Living Room', sqft: 280, dimensions: '16 x 18' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Gas Range', 'Washer', 'Dryer'],
    climate: 'Central A/C and gas furnace',
    walkScore: 72, transitScore: 45, bikeScore: 68,
    schools: [
      { name: 'Austin Elementary', rating: 8, distance: '0.4 mi' },
      { name: 'Eastside Middle School', rating: 7, distance: '1.1 mi' },
      { name: 'Austin High School', rating: 8, distance: '1.8 mi' },
    ],
    neighborhoodSummary: 'East Austin is a vibrant, rapidly growing area known for its eclectic mix of restaurants, live music venues, and local art galleries. The neighborhood offers a walkable lifestyle with easy access to downtown.',
  },
  {
    id: 2, location: 'Denver, CO', rent: '$1,850', beds: 2, baths: 1, sqft: 950, type: 'Apartment',
    imageUrl: 'https://placehold.co/400x300/F0F4FF/4F46E5?text=Rental+2',
    description: 'Modern apartment in LoDo with mountain views. Open floor plan, in-unit laundry, rooftop access. Walking distance to Union Station.',
    lease: '12 months', available: 'Available Mar 1',
    amenities: ['In-Unit Laundry', 'Rooftop Deck', 'Gym', 'Parking'],
    yearBuilt: 2019, petPolicy: 'Small dogs under 25 lbs allowed, $40/mo pet rent', parking: '1 reserved spot included',
    utilities: 'Water & trash included', deposit: '$1,850',
    rooms: [
      { name: 'Primary Bedroom', sqft: 180, dimensions: '12 x 15' },
      { name: 'Bedroom 2', sqft: 130, dimensions: '10 x 13' },
      { name: 'Kitchen', sqft: 120, dimensions: '10 x 12' },
      { name: 'Living Room', sqft: 200, dimensions: '14 x 14' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Electric Range', 'Washer', 'Dryer'],
    climate: 'Forced air heating and central A/C',
    walkScore: 92, transitScore: 82, bikeScore: 88,
    schools: [
      { name: 'Downtown Denver Elementary', rating: 7, distance: '0.6 mi' },
      { name: 'LoDo Middle School', rating: 6, distance: '0.9 mi' },
      { name: 'Denver Central High', rating: 7, distance: '1.5 mi' },
    ],
    neighborhoodSummary: 'LoDo (Lower Downtown) is Denver\'s historic warehouse district turned trendy neighborhood. Packed with breweries, restaurants, and sports venues, it offers unbeatable walkability and transit access via Union Station.',
  },
  {
    id: 3, location: 'Nashville, TN', rent: '$2,100', beds: 2, baths: 2, sqft: 1200, type: 'Condo',
    imageUrl: 'https://placehold.co/400x300/EEF2FF/4F46E5?text=Rental+3',
    description: 'Stylish condo in The Gulch. Floor-to-ceiling windows, quartz countertops, walk-in closets. Building includes concierge and pool.',
    lease: '6-12 months', available: 'Available Now',
    amenities: ['Pool', 'Concierge', 'Fitness Center', 'Balcony'],
    yearBuilt: 2021, petPolicy: 'Cats only, no dogs', parking: '1 reserved garage spot',
    utilities: 'Water, sewer & trash included', deposit: '$2,100',
    rooms: [
      { name: 'Primary Bedroom', sqft: 200, dimensions: '13 x 15' },
      { name: 'Bedroom 2', sqft: 150, dimensions: '12 x 12' },
      { name: 'Kitchen', sqft: 140, dimensions: '10 x 14' },
      { name: 'Living Room', sqft: 250, dimensions: '14 x 18' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Electric Range', 'Wine Cooler'],
    climate: 'Central A/C with smart thermostat',
    walkScore: 85, transitScore: 55, bikeScore: 70,
    schools: [
      { name: 'Gulch Academy', rating: 9, distance: '0.3 mi' },
      { name: 'Nashville Prep', rating: 8, distance: '1.0 mi' },
      { name: 'Music City High', rating: 7, distance: '1.6 mi' },
    ],
    neighborhoodSummary: 'The Gulch is Nashville\'s premier urban neighborhood, offering luxury living steps from Broadway\'s honky-tonks. High-end dining, boutique shopping, and a thriving nightlife make it one of the city\'s most desirable addresses.',
  },
  {
    id: 4, location: 'Atlanta, GA', rent: '$1,650', beds: 1, baths: 1, sqft: 750, type: 'Apartment',
    imageUrl: 'https://placehold.co/400x300/F0F4FF/4F46E5?text=Rental+4',
    description: 'Cozy Midtown studio-style 1-bed. Stainless steel appliances, granite counters, and a private balcony. Near Piedmont Park.',
    lease: '12 months', available: 'Available Now',
    amenities: ['Balcony', 'Pool', 'Dog Park', 'Package Lockers'],
    yearBuilt: 2016, petPolicy: 'Cats & dogs allowed, $35/mo pet rent, 2 pet max', parking: '1 reserved spot, $75/mo',
    utilities: 'Trash & pest control included', deposit: '$1,650',
    rooms: [
      { name: 'Bedroom', sqft: 160, dimensions: '12 x 13' },
      { name: 'Kitchen', sqft: 100, dimensions: '8 x 12' },
      { name: 'Living Room', sqft: 200, dimensions: '13 x 15' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Electric Range'],
    climate: 'Central A/C and heat',
    walkScore: 88, transitScore: 70, bikeScore: 75,
    schools: [
      { name: 'Midtown Elementary', rating: 7, distance: '0.5 mi' },
      { name: 'Piedmont Middle', rating: 6, distance: '1.2 mi' },
      { name: 'Grady High School', rating: 7, distance: '0.8 mi' },
    ],
    neighborhoodSummary: 'Midtown Atlanta is the cultural heart of the city, home to Piedmont Park, the High Museum, and a bustling restaurant scene. Excellent MARTA access makes it easy to get around without a car.',
  },
  {
    id: 5, location: 'Seattle, WA', rent: '$2,800', beds: 2, baths: 2, sqft: 1100, type: 'Apartment',
    imageUrl: 'https://placehold.co/400x300/EEF2FF/4F46E5?text=Rental+5',
    description: 'Luxury apartment in Capitol Hill. Smart home features, heated floors, and stunning city views. Steps from restaurants and nightlife.',
    lease: '12 months', available: 'Available Apr 1',
    amenities: ['Smart Home', 'Heated Floors', 'EV Charging', 'Concierge'],
    yearBuilt: 2023, petPolicy: 'Cats & dogs allowed, $60/mo pet rent', parking: '1 reserved garage spot included',
    utilities: 'Water & garbage included', deposit: '$2,800',
    rooms: [
      { name: 'Primary Bedroom', sqft: 190, dimensions: '13 x 15' },
      { name: 'Bedroom 2', sqft: 140, dimensions: '10 x 14' },
      { name: 'Kitchen', sqft: 130, dimensions: '10 x 13' },
      { name: 'Living Room', sqft: 230, dimensions: '14 x 16' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Induction Range', 'Washer', 'Dryer'],
    climate: 'Radiant floor heating and central A/C',
    walkScore: 95, transitScore: 78, bikeScore: 82,
    schools: [
      { name: 'Capitol Hill Elementary', rating: 8, distance: '0.3 mi' },
      { name: 'Stevens Middle School', rating: 7, distance: '0.7 mi' },
      { name: 'Seattle Central High', rating: 8, distance: '1.2 mi' },
    ],
    neighborhoodSummary: 'Capitol Hill is Seattle\'s most vibrant and eclectic neighborhood. Known for its diverse dining scene, independent shops, and thriving nightlife, it\'s a walker\'s paradise with excellent transit connections.',
  },
  {
    id: 6, location: 'Bloomington, MN', rent: '$1,550', beds: 3, baths: 2, sqft: 1350, type: 'Townhouse',
    imageUrl: 'https://placehold.co/400x300/F0F4FF/4F46E5?text=Rental+6',
    description: 'Spacious townhouse near Mall of America. Attached garage, finished basement, and quiet neighborhood. Great for families.',
    lease: '12-24 months', available: 'Available Now',
    amenities: ['Garage', 'Basement', 'Washer/Dryer', 'Patio'],
    yearBuilt: 2005, petPolicy: 'Cats & dogs allowed, no pet rent, 2 pet max', parking: 'Attached 2-car garage',
    utilities: 'Tenant pays all utilities', deposit: '$1,550',
    rooms: [
      { name: 'Primary Bedroom', sqft: 200, dimensions: '13 x 15' },
      { name: 'Bedroom 2', sqft: 150, dimensions: '12 x 12' },
      { name: 'Bedroom 3', sqft: 130, dimensions: '10 x 13' },
      { name: 'Kitchen', sqft: 160, dimensions: '11 x 14' },
      { name: 'Living Room', sqft: 260, dimensions: '15 x 17' },
      { name: 'Basement', sqft: 400, dimensions: '20 x 20' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Gas Range', 'Washer', 'Dryer'],
    climate: 'Forced air gas furnace and central A/C',
    walkScore: 55, transitScore: 40, bikeScore: 50,
    schools: [
      { name: 'Bloomington Elementary', rating: 8, distance: '0.6 mi' },
      { name: 'Valley View Middle', rating: 8, distance: '1.0 mi' },
      { name: 'Jefferson High School', rating: 9, distance: '1.4 mi' },
    ],
    neighborhoodSummary: 'Bloomington offers a family-friendly suburban lifestyle with easy access to Mall of America, Minnesota Valley Wildlife Refuge, and excellent public schools. A quiet community with convenient freeway access.',
  },
  {
    id: 7, location: 'Charlotte, NC', rent: '$1,900', beds: 2, baths: 2, sqft: 1050, type: 'Apartment',
    imageUrl: 'https://placehold.co/400x300/EEF2FF/4F46E5?text=Rental+7',
    description: 'New construction in South End. Resort-style pool, co-working lounge, and bike storage. Light rail access to Uptown.',
    lease: '12 months', available: 'Available Now',
    amenities: ['Pool', 'Co-Working Space', 'Bike Storage', 'Transit Access'],
    yearBuilt: 2024, petPolicy: 'Cats & dogs under 50 lbs, $45/mo pet rent', parking: '1 reserved spot included',
    utilities: 'Water & trash included', deposit: '$1,900',
    rooms: [
      { name: 'Primary Bedroom', sqft: 180, dimensions: '12 x 15' },
      { name: 'Bedroom 2', sqft: 140, dimensions: '10 x 14' },
      { name: 'Kitchen', sqft: 110, dimensions: '10 x 11' },
      { name: 'Living Room', sqft: 220, dimensions: '14 x 16' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Electric Range', 'Washer', 'Dryer'],
    climate: 'Central A/C with programmable thermostat',
    walkScore: 80, transitScore: 65, bikeScore: 78,
    schools: [
      { name: 'South End Elementary', rating: 7, distance: '0.5 mi' },
      { name: 'Dilworth Middle', rating: 8, distance: '1.1 mi' },
      { name: 'Myers Park High', rating: 9, distance: '2.0 mi' },
    ],
    neighborhoodSummary: 'South End is Charlotte\'s trendiest neighborhood, featuring the LYNX light rail, a booming brewery scene, and the popular Rail Trail for biking and walking. Ideal for young professionals seeking urban convenience.',
  },
  {
    id: 8, location: 'Orlando, FL', rent: '$1,750', beds: 2, baths: 2, sqft: 1000, type: 'Condo',
    imageUrl: 'https://placehold.co/400x300/F0F4FF/4F46E5?text=Rental+8',
    description: 'Bright condo in Lake Nona. Screened lanai, community pool, and close to Medical City. Ideal for young professionals.',
    lease: '6-12 months', available: 'Available Feb 15',
    amenities: ['Screened Lanai', 'Pool', 'Clubhouse', 'Lake Access'],
    yearBuilt: 2018, petPolicy: 'Cats & small dogs allowed, $30/mo pet rent', parking: '1 reserved spot and visitor parking',
    utilities: 'Water included', deposit: '$1,750',
    rooms: [
      { name: 'Primary Bedroom', sqft: 170, dimensions: '12 x 14' },
      { name: 'Bedroom 2', sqft: 130, dimensions: '10 x 13' },
      { name: 'Kitchen', sqft: 110, dimensions: '10 x 11' },
      { name: 'Living Room', sqft: 210, dimensions: '14 x 15' },
    ],
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave', 'Electric Range'],
    climate: 'Central A/C (no heating needed)',
    walkScore: 45, transitScore: 25, bikeScore: 55,
    schools: [
      { name: 'Lake Nona Elementary', rating: 9, distance: '0.4 mi' },
      { name: 'Innovation Middle', rating: 8, distance: '0.8 mi' },
      { name: 'Lake Nona High', rating: 9, distance: '1.2 mi' },
    ],
    neighborhoodSummary: 'Lake Nona is a master-planned community in southeast Orlando, known for its Medical City hub, excellent schools, and resort-style living. A growing area with new restaurants and shopping options.',
  },
  {
    id: 9, location: 'Raleigh, NC', rent: '$1,400', beds: 1, baths: 1, sqft: 700, type: 'Apartment',
    imageUrl: 'https://placehold.co/400x300/EEF2FF/4F46E5?text=Rental+9',
    description: 'Affordable 1-bed near NC State campus. Recently renovated with new appliances and flooring. Utilities included.',
    lease: '12 months', available: 'Available Now',
    amenities: ['Utilities Included', 'Laundry Room', 'Parking', 'Study Lounge'],
    yearBuilt: 2010, petPolicy: 'No pets allowed', parking: '1 spot included',
    utilities: 'All utilities included', deposit: '$700',
    rooms: [
      { name: 'Bedroom', sqft: 150, dimensions: '10 x 15' },
      { name: 'Kitchen', sqft: 90, dimensions: '9 x 10' },
      { name: 'Living Room', sqft: 180, dimensions: '12 x 15' },
    ],
    appliances: ['Refrigerator', 'Microwave', 'Electric Range'],
    climate: 'Window A/C units and baseboard heating',
    walkScore: 78, transitScore: 35, bikeScore: 65,
    schools: [
      { name: 'Hillsborough Elementary', rating: 6, distance: '0.7 mi' },
      { name: 'Ligon Middle', rating: 7, distance: '1.3 mi' },
      { name: 'Broughton High', rating: 8, distance: '1.5 mi' },
    ],
    neighborhoodSummary: 'The area near NC State offers an affordable, student-friendly atmosphere with diverse dining options, Hillsborough Street shops, and Pullen Park nearby. Convenient bus routes connect to downtown Raleigh.',
  },
];

// Mock rent trend data
const mockRentTrend = [
  { month: 'Jan', avg: 1850 },
  { month: 'Feb', avg: 1870 },
  { month: 'Mar', avg: 1900 },
  { month: 'Apr', avg: 1920 },
  { month: 'May', avg: 1960 },
  { month: 'Jun', avg: 2010 },
  { month: 'Jul', avg: 2050 },
  { month: 'Aug', avg: 2080 },
  { month: 'Sep', avg: 2040 },
  { month: 'Oct', avg: 2000 },
  { month: 'Nov', avg: 1970 },
  { month: 'Dec', avg: 1950 },
];

// Tab definitions
const TABS = ['Overview', 'Rental Details', 'Rent Trends', 'Affordability Calculator', 'Neighborhood'];

// Rental Card Component
const RentalCard = ({ rental, onClick }) => (
  <div
    onClick={() => onClick(rental)}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
  >
    <div className="relative">
      <img src={rental.imageUrl} alt={`Rental in ${rental.location}`} className="w-full h-48 object-cover" />
      <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {rental.type}
      </span>
      {rental.available === 'Available Now' && (
        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Available Now
        </span>
      )}
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{rental.rent}<span className="text-sm font-normal text-gray-500">/mo</span></h3>
      </div>
      <p className="text-sm text-gray-500 mt-1">{rental.location}</p>
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
        <span>{rental.beds} bed{rental.beds > 1 ? 's' : ''}</span>
        <span className="text-gray-300">|</span>
        <span>{rental.baths} bath{rental.baths > 1 ? 's' : ''}</span>
        <span className="text-gray-300">|</span>
        <span>{rental.sqft} sqft</span>
      </div>
    </div>
  </div>
);

// Filter Bar Component
const FilterBar = ({ filters, onFilterChange }) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-wrap gap-4 items-center">
    <div>
      <label className="text-xs font-medium text-gray-500 block mb-1">Property Type</label>
      <select
        value={filters.type}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="All">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Condo">Condo</option>
        <option value="Townhouse">Townhouse</option>
      </select>
    </div>
    <div>
      <label className="text-xs font-medium text-gray-500 block mb-1">Bedrooms</label>
      <select
        value={filters.beds}
        onChange={(e) => onFilterChange({ ...filters, beds: e.target.value })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="Any">Any</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>
    </div>
    <div>
      <label className="text-xs font-medium text-gray-500 block mb-1">Max Rent</label>
      <select
        value={filters.maxRent}
        onChange={(e) => onFilterChange({ ...filters, maxRent: e.target.value })}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="Any">Any Price</option>
        <option value="1500">Under $1,500</option>
        <option value="2000">Under $2,000</option>
        <option value="2500">Under $2,500</option>
      </select>
    </div>
  </div>
);

// Search Bar Component
const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className="mb-6">
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search by location or keywords..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
    </div>
  </div>
);

// Score Badge Component
const ScoreBadge = ({ label, score }) => {
  const color = score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-500';
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${color}`}>{score}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
};

// Overview Tab
const OverviewTab = ({ rental }) => (
  <div>
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">{rental.type}</span>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rental.available === 'Available Now' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {rental.available}
      </span>
    </div>
    <h2 className="text-3xl font-bold text-gray-800">{rental.rent}<span className="text-lg font-normal text-gray-500">/month</span></h2>
    <p className="text-xl text-gray-600 mt-1">{rental.location}</p>
    <p className="text-gray-700 mt-4 leading-relaxed">{rental.description}</p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {[
        { label: 'Beds', value: rental.beds },
        { label: 'Baths', value: rental.baths },
        { label: 'Sqft', value: rental.sqft.toLocaleString() },
        { label: 'Year Built', value: rental.yearBuilt },
      ].map((stat) => (
        <div key={stat.label} className="bg-indigo-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// Rental Details Tab
const RentalDetailsTab = ({ rental }) => (
  <div className="space-y-8">
    {/* Lease & Costs */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Lease & Costs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Lease Term', value: rental.lease },
          { label: 'Security Deposit', value: rental.deposit },
          { label: 'Pet Policy', value: rental.petPolicy },
          { label: 'Parking', value: rental.parking },
          { label: 'Utilities', value: rental.utilities },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-500">{item.label}</div>
            <div className="text-sm text-gray-800 mt-1">{item.value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Room Breakdown */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Room Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-500 font-medium">Room</th>
              <th className="text-left py-2 text-gray-500 font-medium">Sqft</th>
              <th className="text-left py-2 text-gray-500 font-medium">Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {rental.rooms.map((room, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 text-gray-800">{room.name}</td>
                <td className="py-2 text-gray-600">{room.sqft}</td>
                <td className="py-2 text-gray-600">{room.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Climate */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Climate Control</h3>
      <p className="text-sm text-gray-700">{rental.climate}</p>
    </div>

    {/* Appliances */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Appliances</h3>
      <div className="flex flex-wrap gap-2">
        {rental.appliances.map((item, i) => (
          <span key={i} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{item}</span>
        ))}
      </div>
    </div>

    {/* Amenities */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {rental.amenities.map((item, i) => (
          <span key={i} className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full">{item}</span>
        ))}
      </div>
    </div>
  </div>
);

// Rent Trends Tab
const RentTrendsTab = ({ rental }) => (
  <div>
    <h3 className="text-2xl font-semibold text-indigo-700">Rent Trend Analysis</h3>
    <p className="text-gray-600 mt-2">Average monthly rent in {rental.location} over the past 12 months</p>
    <div className="w-full h-80 mt-6 bg-gray-50 p-4 rounded-xl shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockRentTrend} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={['dataMin - 100', 'dataMax + 100']} tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => [`$${value}`, 'Avg Rent']} />
          <Line type="monotone" dataKey="avg" stroke="#4F46E5" strokeWidth={2} name="Average Rent" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
      <p className="text-sm text-indigo-800">
        <span className="font-semibold">AI Rent Projection:</span> Based on current trends, rents in {rental.location} are expected to remain stable with a slight increase of 2-3% over the next 6 months.
      </p>
    </div>
  </div>
);

// Affordability Calculator Tab
const AffordabilityCalculatorTab = ({ rental }) => {
  const rentNum = parseRent(rental.rent);
  const [monthlyIncome, setMonthlyIncome] = useState(rentNum * 4);
  const [monthlyRent, setMonthlyRent] = useState(rentNum);

  const ratio = monthlyIncome > 0 ? (monthlyRent / monthlyIncome) * 100 : 0;
  const utilitiesEst = Math.round(monthlyRent * 0.1);
  const insuranceEst = 15;
  const remaining = monthlyIncome - monthlyRent - utilitiesEst - insuranceEst;

  const ratioColor = ratio <= 30 ? 'text-green-600' : ratio <= 40 ? 'text-yellow-600' : 'text-red-600';
  const ratioBg = ratio <= 30 ? 'bg-green-50 border-green-200' : ratio <= 40 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
  const ratioLabel = ratio <= 30 ? 'Affordable' : ratio <= 40 ? 'Moderate' : 'High';

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-indigo-700">Affordability Calculator</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Monthly Income ($)</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            data-testid="income-input"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Monthly Rent ($)</label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            data-testid="rent-input"
          />
        </div>
      </div>

      {/* Ratio Indicator */}
      <div className={`border rounded-xl p-6 text-center ${ratioBg}`}>
        <div className={`text-4xl font-bold ${ratioColor}`} data-testid="ratio-display">
          {ratio.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600 mt-1">Rent-to-Income Ratio</div>
        <div className={`text-sm font-semibold mt-1 ${ratioColor}`}>{ratioLabel}</div>
      </div>

      {/* Budget Breakdown */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Estimated Monthly Budget</h4>
        <div className="space-y-3">
          {[
            { label: 'Rent', amount: monthlyRent },
            { label: 'Utilities (est.)', amount: utilitiesEst },
            { label: "Renter's Insurance (est.)", amount: insuranceEst },
            { label: 'Remaining Income', amount: remaining },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{row.label}</span>
              <span className={`text-sm font-semibold ${row.amount < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                ${row.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Neighborhood Tab
const NeighborhoodTab = ({ rental }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Scores</h3>
      <div className="grid grid-cols-3 gap-6">
        <ScoreBadge label="Walk Score" score={rental.walkScore} />
        <ScoreBadge label="Transit Score" score={rental.transitScore} />
        <ScoreBadge label="Bike Score" score={rental.bikeScore} />
      </div>
    </div>

    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
      <h4 className="text-sm font-semibold text-indigo-700 mb-2">About the Neighborhood</h4>
      <p className="text-sm text-gray-700 leading-relaxed">{rental.neighborhoodSummary}</p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Nearby Schools</h3>
      <div className="space-y-3">
        {rental.schools.map((school, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div>
              <div className="text-sm font-medium text-gray-800">{school.name}</div>
              <div className="text-xs text-gray-500">{school.distance}</div>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-lg font-bold ${school.rating >= 8 ? 'text-green-600' : school.rating >= 6 ? 'text-yellow-600' : 'text-red-500'}`}>
                {school.rating}
              </span>
              <span className="text-xs text-gray-400">/10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" data-testid="modal-backdrop" onClick={onClose}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" data-testid="modal-close">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Schedule Tour Form Component
const ScheduleTourForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [submitted, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.date.trim()) newErrors.date = 'Preferred date is required';
    if (!form.time) newErrors.time = 'Preferred time is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8" data-testid="tour-success">
        <div className="text-green-500 text-5xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-gray-800">Tour Scheduled!</h3>
        <p className="text-gray-500 mt-2">We'll confirm your tour shortly.</p>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${errors[field] ? 'border-red-400' : 'border-gray-300'}`;

  return (
    <form onSubmit={handleSubmit} data-testid="tour-form" className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Name *</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Email *</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Phone *</label>
        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Preferred Date *</label>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass('date')} />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Preferred Time *</label>
        <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass('time')}>
          <option value="">Select a time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Message</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" rows="3" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Schedule Tour</button>
    </form>
  );
};

// Contact Landlord Form Component
const ContactLandlordForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [submitted, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8" data-testid="contact-success">
        <div className="text-green-500 text-5xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-gray-800">Message Sent!</h3>
        <p className="text-gray-500 mt-2">The landlord will get back to you soon.</p>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${errors[field] ? 'border-red-400' : 'border-gray-300'}`;

  return (
    <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Name *</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Email *</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Phone *</label>
        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Message *</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass('message')} rows="4" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Send Message</button>
    </form>
  );
};

// Rental Detail Screen with Tabs and Sidebar
const RentalDetailScreen = ({ rental, onBackClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showTourModal, setShowTourModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <OverviewTab rental={rental} />;
      case 1: return <RentalDetailsTab rental={rental} />;
      case 2: return <RentTrendsTab rental={rental} />;
      case 3: return <AffordabilityCalculatorTab rental={rental} />;
      case 4: return <NeighborhoodTab rental={rental} />;
      default: return null;
    }
  };

  return (
    <div className="p-8">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={onBackClick} className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="text-sm font-medium">Back to rentals</span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="mb-6">
        <img src={rental.imageUrl} alt={`Rental in ${rental.location}`} className="w-full h-64 object-cover rounded-2xl shadow-md" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto gap-1 mb-6 bg-gray-100 rounded-xl p-1">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === index
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                role="tab"
                aria-selected={activeTab === index}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {renderTabContent()}
          </div>
        </div>

        {/* Sticky Sidebar CTA */}
        <div className="lg:w-72">
          <div className="lg:sticky lg:top-8 bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{rental.rent}<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500 mt-1">{rental.location}</div>
            </div>
            <button onClick={() => setShowTourModal(true)} className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors duration-200">
              Schedule a Tour
            </button>
            <button onClick={() => setShowContactModal(true)} className="w-full border-2 border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors duration-200">
              Contact Landlord
            </button>
            <div className="text-center pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400">Starterhomes AI Network</span>
            </div>
          </div>
        </div>
      </div>

      {showTourModal && (
        <Modal isOpen={showTourModal} onClose={() => setShowTourModal(false)} title="Schedule a Tour">
          <ScheduleTourForm onClose={() => setShowTourModal(false)} />
        </Modal>
      )}
      {showContactModal && (
        <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Contact Landlord">
          <ContactLandlordForm onClose={() => setShowContactModal(false)} />
        </Modal>
      )}
    </div>
  );
};

// Rental List Screen
const RentalListScreen = ({ rentals, onRentalClick, filters, onFilterChange, searchQuery, onSearchChange }) => (
  <div className="p-8">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-indigo-700">Premium Rentals</h1>
      <h2 className="text-xl font-medium text-gray-600 mt-2">Find your perfect rental with AI-powered matching</h2>
    </div>

    <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
    <FilterBar filters={filters} onFilterChange={onFilterChange} />

    {rentals.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} onClick={onRentalClick} />
        ))}
      </div>
    ) : (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">No rentals match your filters. Try adjusting your criteria.</p>
      </div>
    )}
  </div>
);

// Helper to parse rent string to number
const parseRent = (rentStr) => parseInt(rentStr.replace(/[$,]/g, ''), 10);

// Main Rent Component
const Rent = () => {
  const [selectedRental, setSelectedRental] = useState(null);
  const [filters, setFilters] = useState({ type: 'All', beds: 'Any', maxRent: 'Any' });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRentals = mockRentals.filter((rental) => {
    if (filters.type !== 'All' && rental.type !== filters.type) return false;
    if (filters.beds !== 'Any' && rental.beds < parseInt(filters.beds, 10)) return false;
    if (filters.maxRent !== 'Any' && parseRent(rental.rent) > parseInt(filters.maxRent, 10)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesLocation = rental.location.toLowerCase().includes(q);
      const matchesDescription = rental.description.toLowerCase().includes(q);
      if (!matchesLocation && !matchesDescription) return false;
    }
    return true;
  });

  return (
    <>
      {selectedRental ? (
        <RentalDetailScreen rental={selectedRental} onBackClick={() => setSelectedRental(null)} />
      ) : (
        <RentalListScreen
          rentals={filteredRentals}
          onRentalClick={setSelectedRental}
          filters={filters}
          onFilterChange={setFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}
    </>
  );
};

export default Rent;
