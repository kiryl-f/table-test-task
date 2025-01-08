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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      const { page, filters, sortKey, sortOrder } = JSON.parse(savedState);
      setPage(page || 1);
      setFilters(filters || {});
      setSortKey(sortKey || null);
      setSortOrder(sortOrder || 'asc');
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
    if (params.sortOrder) setSortOrder(params.sortOrder as 'asc' | 'desc');
  };

  useEffect(() => {
    const stateToSave = { page, filters, sortKey, sortOrder };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [page, filters, sortKey, sortOrder]);

  const handleSort = (key: keyof Brewery) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return {
    filters,
    setFilters,
    page,
    setPage,
    sortKey,
    sortOrder,
    handleSort,
    syncStateWithQueryParams,
  };
};

export default useBreweryTableState;
