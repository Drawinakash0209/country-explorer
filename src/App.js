import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryDetail from './components/CountryDetail';
import CountryList from './components/CountryList';
import Login from './components/Login';
import SearchFilter from './components/SearchFilter';

function App() {
  const [user, setUser] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && !selectedCountryCode) {
      setLoading(true);
      setError(null);
      axios
        .get('https://restcountries.com/v3.1/all')
        .then((response) => {
          setCountries(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching all countries:', err);
          setError('Failed to fetch countries. Please try again.');
          setLoading(false);
        });
    }
  }, [user, selectedCountryCode]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCountries([]);
    setSelectedCountryCode(null);
    setError(null);
  };

  const handleCountrySelect = (code) => {
    setSelectedCountryCode(code);
  };

  const handleBackToList = () => {
    setSelectedCountryCode(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-400">Country Explorer</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition"
              >
                Logout
              </button>
            </div>
          </header>
          {selectedCountryCode ? (
            <CountryDetail code={selectedCountryCode} onBack={handleBackToList} />
          ) : (
            <>
              <SearchFilter setCountries={setCountries} setLoading={setLoading} setError={setError} />
              {loading && <p className="text-center mt-8 text-indigo-400 animate-pulse">Loading countries...</p>}
              {error && <p className="text-center mt-8 text-red-500">{error}</p>}
              {!loading && !error && (
                <CountryList countries={countries} onCountryClick={handleCountrySelect} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;