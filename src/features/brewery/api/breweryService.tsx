import { Brewery } from "../types";

export const fetchBreweries = async (
  page: number,
  perPage: number,
  filters: {
    types: string[];
    search: string;
    minLatitude?: number;
    maxLatitude?: number;
  },
  sortKey: keyof Brewery | null,
) => {
  const fetchByType = async (type: string) => {
    const params = new URLSearchParams();
    params.append('by_type', type);
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    if (filters.search) {
      params.append('by_name', filters.search);
    }

    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch breweries of type ${type}`);
    }
    return response.json();
  };

  let combinedResults: Brewery[] = [];

  if (filters.types.length > 0) {
    const requests = filters.types.map((type) => fetchByType(type));
    const results = await Promise.all(requests);
    combinedResults = results.flat();
  } else {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(perPage));

    if (filters.search) {
      params.append('by_name', filters.search);
    }

    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?${params.toString()}`);
    //console.log('fetching: ' + `https://api.openbrewerydb.org/v1/breweries?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch breweries');
    }
    combinedResults = await response.json();
  }

  combinedResults = combinedResults.filter((brewery) => {
    const latitude = parseFloat(brewery.latitude);
    
    const inLatitudeRange =
      (!filters.minLatitude || latitude >= filters.minLatitude) &&
      (!filters.maxLatitude || latitude <= filters.maxLatitude);
  
    //console.log(`inLatitudeRange from ${filters.minLatitude} to ${filters.maxLatitude}: ` + brewery.name);
    return inLatitudeRange;
  });

  if (sortKey) {
    combinedResults.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
  }

  return combinedResults.slice(0, perPage);
};
