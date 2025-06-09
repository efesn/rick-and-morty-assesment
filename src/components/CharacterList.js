import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCharacters } from '../api/rickAndMortyApi';

const CharacterList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    sort: searchParams.get('sort') || '',
    page: parseInt(searchParams.get('page')) || 1,
    pageSize: parseInt(searchParams.get('pageSize')) || 20,
  });

  const { data, isLoading, error } = useQuery(
    ['characters', filters],
    () => getCharacters(filters),
    { keepPreviousData: true }
  );

  const handleFilterChange = (field, value) => {
    const newFilters = { 
      ...filters, 
      [field]: value, 
      page: field === 'page' ? value : 1
    };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (key === 'page' || key === 'pageSize' || val) {
        params.set(key, val);
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    handleFilterChange('page', newPage);
  };

  const getStatusBadgeClass = (status) => {
    const baseClass = 'status-badge';
    switch (status?.toLowerCase()) {
      case 'alive': return `${baseClass} status-badge-alive`;
      case 'dead': return `${baseClass} status-badge-dead`;
      default: return `${baseClass} status-badge-unknown`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-portal-spin">
          <div className="w-16 h-16 border-4 border-portal-green rounded-full border-t-portal-blue"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="search-input"
          />
          
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <select
            value={filters.species}
            onChange={(e) => handleFilterChange('species', e.target.value)}
            className="filter-select"
          >
            <option value="">All Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Robot">Robot</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="filter-select"
          >
            <option value="">Default Sort</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="id-asc">ID (Oldest)</option>
            <option value="id-desc">ID (Newest)</option>
          </select>

          <select
            value={filters.pageSize}
            onChange={(e) => handleFilterChange('pageSize', parseInt(e.target.value))}
            className="filter-select"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="30">30 per page</option>
            <option value="40">40 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {data?.results?.length === 0 ? (
        <div className="bg-portal-blue/20 border border-portal-blue text-white px-4 py-3 rounded-lg">
          No characters found matching your criteria.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {data?.results.map((character) => (
              <div
                key={character.id}
                className="card group cursor-pointer"
                onClick={() => navigate(`/character/${character.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-12">
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{character.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={getStatusBadgeClass(character.status)}>
                        {character.status}
                      </span>
                      <span className="status-badge bg-portal-blue/30">
                        {character.species}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400">Last known location:</p>
                  <p className="text-white">{character.location.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className={`portal-button ${filters.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-dimension-gray rounded-lg text-white">
                Page {filters.page} of {data?.info?.pages}
              </span>
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page === data?.info?.pages}
                className={`portal-button ${filters.page === data?.info?.pages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList; 