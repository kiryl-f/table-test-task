import axios from 'axios';

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

export const fetchBreweries = async (page: number, perPage: number) => {
  const response = await axios.get(`${BASE_URL}?per_page=${perPage}&page=${page}`);
  return response.data;
};
