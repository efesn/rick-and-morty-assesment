import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';
const CHARACTER_LIMIT = 333;

const fetchAllCharacters = async (filters) => {
  const { name, status, species } = filters;
  const apiItemsPerPage = 20;
  let allResults = [];

  try {
    const firstResponse = await axios.get(`${BASE_URL}/character`, {
      params: {
        page: 1,
        name,
        status,
        species,
      },
    });

    const totalApiResults = firstResponse.data.info.count;
    const totalApiPages = firstResponse.data.info.pages;
    const pagesNeeded = Math.ceil(Math.min(CHARACTER_LIMIT, totalApiResults) / apiItemsPerPage);

    allResults = [...firstResponse.data.results];

    const remainingPagePromises = [];
    for (let i = 2; i <= pagesNeeded; i++) {
      remainingPagePromises.push(
        axios.get(`${BASE_URL}/character`, {
          params: {
            page: i,
            name,
            status,
            species,
          },
        })
      );
    }

    const responses = await Promise.all(remainingPagePromises);
    responses.forEach(res => {
      allResults.push(...res.data.results);
    });

    allResults = allResults.slice(0, CHARACTER_LIMIT);

    return allResults;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};


const sortCharacters = (characters, sort) => {
  if (!sort) return characters;

  const [field, order] = sort.split('-');
  return [...characters].sort((a, b) => {
    if (field === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (field === 'id') {
      return order === 'asc'
        ? a.id - b.id
        : b.id - a.id;
    }
    return 0;
  });
};

const paginateResults = (results, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  return results.slice(startIndex, startIndex + pageSize);
};

export const getCharacters = async ({ page = 1, pageSize = 20, name = '', status = '', species = '', sort = '' }) => {
  try {
    const allResults = await fetchAllCharacters({ name, status, species });
    
    const sortedResults = sortCharacters(allResults, sort);
    
    const totalResults = sortedResults.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    
    if (page > totalPages) {
      return {
        info: { pages: totalPages, count: totalResults, pageSize },
        results: [],
      };
    }

    const paginatedResults = paginateResults(sortedResults, page, pageSize);

    return {
      info: {
        count: totalResults,
        pages: totalPages,
        pageSize,
      },
      results: paginatedResults,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        info: { pages: 0, count: 0 },
        results: [],
      };
    }
    throw new Error(error.response?.data?.error || 'Failed to fetch characters');
  }
};

export const getCharacterById = async (id) => {
  try {
    if (id > CHARACTER_LIMIT) {
      throw new Error('Character not found');
    }
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch character');
  }
}; 