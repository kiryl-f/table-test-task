import { useState } from 'react';
import { Brewery } from '../types';

const useBreweryTableState = (searchParams: URLSearchParams) => {
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

  const syncStateWithQueryParams = () => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.page) setPage(Number(params.page));
    if (params.type) setFilters((prev) => ({ ...prev, types: params.type.split(',') }));
    if (params.search) setFilters((prev) => ({ ...prev, search: params.search }));
    if (params.minLatitude) setFilters((prev) => ({ ...prev, minLatitude: Number(params.minLatitude) }));
    if (params.maxLatitude) setFilters((prev) => ({ ...prev, maxLatitude: Number(params.maxLatitude) }));
    if (params.sortKey) setSortKey(params.sortKey as keyof Brewery);
    if (params.sortOrder) setSortOrder(params.sortOrder as 'asc' | 'desc');
  };

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
