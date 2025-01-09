import { useState } from 'react';
import { fetchBreweries } from '../api/breweryService';
import { Brewery } from '../types';

const useBreweryLoader = (page: number, filters: any, sortKey: keyof Brewery | null) => {
  const [data, setData] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBreweries = async () => {
    setLoading(true);
    setError(null);
    try {
      const breweries = await fetchBreweries(page, 50, filters, sortKey);
      setData(breweries);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch breweries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loadBreweries };
};

export default useBreweryLoader;
