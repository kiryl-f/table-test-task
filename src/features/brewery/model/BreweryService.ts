export const fetchBreweries = async (page: number, perPage: number) => {
  const response = await fetch(
    `https://api.openbrewerydb.org/breweries?page=${page}&per_page=${perPage}`
  );
  if (!response.ok) throw new Error('Failed to fetch breweries');
  return response.json();
};
