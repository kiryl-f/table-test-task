import { Brewery } from "../ui/BreweryTable";

export const fetchBreweries = async (
  page: number,
  perPage: number,
  filters?: { type?: string; search?: string },
  sortKey?: keyof Brewery,
  sortOrder?: 'asc' | 'desc'
): Promise<Brewery[]> => {
  let url = `https://api.openbrewerydb.org/v1/breweries?per_page=${perPage}&page=${page}`;

  if (filters?.type) {
    url += `&by_type=${filters.type}`;
  }
  if (filters?.search) {
    url += `&by_name=${filters.search}`;
  }
  if (sortKey) {
    url += `&sort=${sortKey}:${sortOrder}`;
  }

  const response = await fetch(url);
  return response.json();
};
