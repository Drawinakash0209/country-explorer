import React from 'react';

function CountryList({ countries, onCountryClick }) {
  if (!countries || countries.length === 0) {
    return <p className="text-center mt-8 text-gray-400">No countries found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {countries.map((country) => (
        <div
          key={country.cca3}
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
          onClick={() => onCountryClick(country.cca3)}
        >
          <div className="relative">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-full h-40 object-cover"
            />
            <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
              {country.region || 'N/A'}
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-100 truncate">{country.name.common}</h2>
            <p className="text-sm text-gray-400 mt-1">Population: {country.population?.toLocaleString() || 'N/A'}</p>
            {country.capital && (
              <p className="text-sm text-gray-400 mt-1">Capital: {country.capital[0]}</p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountryList;