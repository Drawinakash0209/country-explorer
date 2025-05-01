import axios from 'axios';
import React, { useState } from 'react';

function SearchFilter({ setCountries, setLoading, setError }) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const fetchAllCountries = () => {
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
        setError('Failed to fetch countries.');
        setLoading(false);
        setCountries([]);
      });
  };

  const handleSearch = () => {
    if (search) {
      setLoading(true);
      setError(null);
      axios
        .get(`https://restcountries.com/v3.1/name/${search}`)
        .then((response) => {
          setCountries(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(`Error fetching country "${search}":`, err);
          setError(`No countries found for "${search}".`);
          setCountries([]);
          setLoading(false);
        });
    } else {
      fetchAllCountries();
    }
    setRegion('');
  };

  const handleRegionFilter = (selectedRegion) => {
    setRegion(selectedRegion);
    if (selectedRegion) {
      setLoading(true);
      setError(null);
      axios
        .get(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((response) => {
          setCountries(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(`Error fetching region "${selectedRegion}":`, err);
          setError(`Failed to fetch countries for region "${selectedRegion}".`);
          setCountries([]);
          setLoading(false);
        });
    } else {
      fetchAllCountries();
    }
    setSearch('');
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <div className="flex flex-grow">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          placeholder="Search by country name..."
          className="p-2 bg-gray-800 border border-gray-700 rounded-l-md flex-grow text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition"
          aria-label="Search countries"
        >
          Search
        </button>
      </div>
      <select
        value={region}
        onChange={(e) => handleRegionFilter(e.target.value)}
        className="p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Filter by region"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default SearchFilter;