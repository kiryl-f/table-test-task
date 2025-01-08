import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table } from '../../../shared/ui/Table';
import { fetchBreweries } from '../api/breweryService';
import styles from '../../../styles/components/BreweryTable.module.scss';
import { Filters } from './Filters';
import { Pagination } from './Pagination';

import LatitudeFilter from './filters/LatitudeFilter';

export type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state: string;
  longitude: string;
  latitude: string;
};

const BreweryTable: React.FC = () => {
  const [data, setData] = useState<Brewery[]>([]);

  console.log('breweries: ' + JSON.stringify(data).length);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [filters, setFilters] = useState<{
    types: string[];
    search: string;
    minLongitude?: number;
    maxLongitude?: number;
    minLatitude?: number;
    maxLatitude?: number;
  }>({
    types: [],
    search: '',
  });

  const [sortKey, setSortKey] = useState<keyof Brewery | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchParams, setSearchParams] = useSearchParams();

  const saveStateToLocalStorage = () => {
    localStorage.setItem(
      'breweryTableState',
      JSON.stringify({ page, filters, sortKey, sortOrder })
    );
  };

  const loadStateFromLocalStorage = () => {
    const savedState = localStorage.getItem('breweryTableState');
    if (savedState) {
      const { page, filters, sortKey, sortOrder } = JSON.parse(savedState);
      setPage(page);
      setFilters(filters);
      setSortKey(sortKey);
      setSortOrder(sortOrder);
    }
  };

  const syncStateWithQueryParams = () => {
    const params: Record<string, string> = {};
    if (filters.types.length > 0) params.type = filters.types.join(',');
    if (filters.search) params.search = filters.search;
    if (filters.minLongitude !== undefined)
      params.minLongitude = filters.minLongitude.toString();
    if (filters.maxLongitude !== undefined)
      params.maxLongitude = filters.maxLongitude.toString();
    if (filters.minLatitude !== undefined)
      params.minLatitude = filters.minLatitude.toString();
    if (filters.maxLatitude !== undefined)
      params.maxLatitude = filters.maxLatitude.toString();
    if (sortKey) params.sortKey = sortKey;
    if (sortOrder) params.sortOrder = sortOrder;
    params.page = String(page);
    setSearchParams(params);
  };

  const loadStateFromQueryParams = () => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.page) setPage(Number(params.page));
    if (params.type) setFilters((prev) => ({ ...prev, types: params.type.split(',') }));
    if (params.search) setFilters((prev) => ({ ...prev, search: params.search }));
    if (params.minLongitude)
      setFilters((prev) => ({ ...prev, minLongitude: Number(params.minLongitude) }));
    if (params.maxLongitude)
      setFilters((prev) => ({ ...prev, maxLongitude: Number(params.maxLongitude) }));
    if (params.minLatitude)
      setFilters((prev) => ({ ...prev, minLatitude: Number(params.minLatitude) }));
    if (params.maxLatitude)
      setFilters((prev) => ({ ...prev, maxLatitude: Number(params.maxLatitude) }));
    if (params.sortKey) setSortKey(params.sortKey as keyof Brewery);
    if (params.sortOrder) setSortOrder(params.sortOrder as 'asc' | 'desc');
  };

  useEffect(() => {
    loadStateFromLocalStorage();
    loadStateFromQueryParams();
  }, []);


  const filterBreweriesByLocation = (breweries: Brewery[], filters: any) => {
    return breweries.filter((brewery) => {
      const longitude = parseFloat(brewery.longitude);
      const latitude = parseFloat(brewery.latitude);

      console.log('longitude: ' + longitude);

      console.log('latiude: ' + latitude);

      const isLongitudeInRange =
        (filters.minLongitude === undefined || longitude >= filters.minLongitude) &&
        (filters.maxLongitude === undefined || longitude <= filters.maxLongitude);

      const isLatitudeInRange =
        (filters.minLatitude === undefined || latitude >= filters.minLatitude) &&
        (filters.maxLatitude === undefined || latitude <= filters.maxLatitude);

      return isLongitudeInRange && isLatitudeInRange;
    });
  };

  const loadBreweries = async () => {
    setLoading(true);
    try {
      let breweries = await fetchBreweries(page, perPage, filters, sortKey!, sortOrder);
      breweries = filterBreweriesByLocation(breweries, filters);
      setData(breweries);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBreweries();
    saveStateToLocalStorage();
    syncStateWithQueryParams();
  }, [page, filters, sortKey, sortOrder]);

  const columns: { key: keyof Brewery; title: string; sortable?: boolean; onSort?: () => void }[] =
    [
      {
        key: 'name',
        title: 'Name',
        sortable: true,
        onSort: () => handleSort('name'),
      },
      {
        key: 'brewery_type',
        title: 'Type',
        sortable: true,
        onSort: () => handleSort('brewery_type'),
      },
      { key: 'city', title: 'City' },
      { key: 'state', title: 'State' },
    ];

  const handleSort = (key: keyof Brewery) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };


  const handleLatitudeFilter = (minLatitude: number | null, maxLatitude: number | null) => {
    setFilters((prev) => ({
      ...prev,
      minLatitude: minLatitude ?? undefined,
      maxLatitude: maxLatitude ?? undefined,
    }));
    setPage(1);
  };


  return (
    <div className={styles.tableContainer}>
      <Filters filters={filters} setFilters={setFilters} setPage={setPage} />

      <div className={styles.locationFilters}>
        <LatitudeFilter onApplyFilter={handleLatitudeFilter} />
      </div>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          <Table data={data} columns={columns} />
          <Pagination page={page} setPage={setPage} dataLength={data.length} perPage={perPage} />
        </>
      )}
    </div>
  );
};

export default BreweryTable;
