import { useState, useEffect } from 'react';
import { Brewery } from '../types';

const LOCAL_STORAGE_KEY = 'breweryTableState';

const useBreweryTableState = (searchParams: URLSearchParams = new URLSearchParams()) => {
  const [filters, setFilters] = useState<{
    types: string[];
    search: string;
    minLatitude?: number;
    maxLatitude?: number;
  }>({
    types: [],
    search: '',
  });
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Brewery | null>(null);

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      const { page, filters, sortKey } = JSON.parse(savedState);
      setPage(page || 1);
      setFilters(filters || {});
      setSortKey(sortKey || null);
    }
  }, []);

  const syncStateWithQueryParams = () => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.page) setPage(Number(params.page));
    if (params.type) setFilters((prev) => ({ ...prev, types: params.type.split(',') }));
    if (params.search) setFilters((prev) => ({ ...prev, search: params.search }));
    if (params.minLatitude)
      setFilters((prev) => ({ ...prev, minLatitude: Number(params.minLatitude) }));
    if (params.maxLatitude)
      setFilters((prev) => ({ ...prev, maxLatitude: Number(params.maxLatitude) }));
    if (params.sortKey) setSortKey(params.sortKey as keyof Brewery);
  };

  useEffect(() => {
    const stateToSave = { page, filters, sortKey };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [page, filters, sortKey]);

  const handleSort = (key: keyof Brewery) => {
    if (sortKey === key) {
      setSortKey(null); 
    } else {
      setSortKey(key);
    }
  };

  return {
    filters,
    setFilters,
    page,
    setPage,
    sortKey,
    handleSort,
    syncStateWithQueryParams,
  };
};

export default useBreweryTableState;
