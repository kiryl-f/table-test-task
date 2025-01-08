import { Brewery } from "../ui/BreweryTable";

export const fetchBreweries = async (
  page: number,
  perPage: number,
  filters: {
    types: string[];
    search: string;
    minLongitude?: number;
    maxLongitude?: number;
    minLatitude?: number;
    maxLatitude?: number;
  },
  sortKey: keyof Brewery | null,
  sortOrder: 'asc' | 'desc'
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
    if (!response.ok) {
      throw new Error('Failed to fetch breweries');
    }
    combinedResults = await response.json();
  }

  // Filter by longitude and latitude ranges
  combinedResults = combinedResults.filter((brewery) => {
    const { longitude, latitude } = brewery;
    const inLongitudeRange =
      (!filters.minLongitude || longitude >= filters.minLongitude) &&
      (!filters.maxLongitude || longitude <= filters.maxLongitude);
    const inLatitudeRange =
      (!filters.minLatitude || latitude >= filters.minLatitude) &&
      (!filters.maxLatitude || latitude <= filters.maxLatitude);
    return inLongitudeRange && inLatitudeRange;
  });

  // Sorting
  if (sortKey) {
    combinedResults.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return combinedResults.slice(0, perPage);
  };
  