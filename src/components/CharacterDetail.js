import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById } from '../api/rickAndMortyApi';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: character, isLoading, error } = useQuery(
    ['character', id],
    () => getCharacterById(id)
  );

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
      <button
        onClick={() => navigate(-1)}
        className="portal-button mb-8 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Characters</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-portal-green to-portal-blue rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative card overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dimension-gray rounded-lg p-6 shadow-xl">
            <h2 className="text-4xl title-gradient mb-4">
              {character.name}
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={getStatusBadgeClass(character.status)}>
                {character.status}
              </span>
              <span className="status-badge bg-portal-blue/30">
                {character.species}
              </span>
              {character.type && (
                <span className="status-badge bg-portal-green/30">
                  {character.type}
                </span>
              )}
              <span className="status-badge bg-morty-yellow/30">
                {character.gender}
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-portal-green pl-4">
                <h3 className="text-portal-blue text-lg font-bold mb-1">Origin Location</h3>
                <p className="text-white">{character.origin.name}</p>
              </div>

              <div className="border-l-4 border-portal-blue pl-4">
                <h3 className="text-portal-green text-lg font-bold mb-1">Last Known Location</h3>
                <p className="text-white">{character.location.name}</p>
              </div>

              <div className="border-l-4 border-morty-yellow pl-4">
                <h3 className="text-portal-blue text-lg font-bold mb-1">First Seen In</h3>
                <p className="text-white">Episode {character.episode[0].split('/').pop()}</p>
              </div>

              <div className="mt-6 bg-dimension-gray/50 rounded-lg p-4">
                <h3 className="text-portal-green text-lg font-bold mb-2">Total Appearances</h3>
                <div className="text-4xl font-bold text-white">
                  {character.episode.length} <span className="text-lg text-gray-400">episodes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail; 