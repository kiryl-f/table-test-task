import { useState } from 'react';
import { fetchBreweries } from '../api/breweryService';
import { Brewery } from '../types';

const useBreweryLoader = (page: number, filters: any, sortKey: keyof Brewery | null) => {
  const [data, setData] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBreweries = async () => {
    setLoading(true);
    try {
      let breweries = await fetchBreweries(page, 20, filters, sortKey);
      setData(breweries);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return { data, loading, loadBreweries };
};

export default useBreweryLoader;
