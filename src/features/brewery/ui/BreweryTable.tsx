import React, { useEffect, useState } from 'react';
import { Table } from '../../../shared/ui/Table';
import { fetchBreweries } from '../model/BreweryService';
import styles from '../../../styles/components/BreweryTable.module.scss';

export type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state: string;
};

const BreweryTable: React.FC = () => {
  const [data, setData] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [filters, setFilters] = useState({ type: '', search: '' });
  const [sortKey, setSortKey] = useState<keyof Brewery | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const loadBreweries = async () => {
    setLoading(true);
    try {
      const breweries = await fetchBreweries(page, perPage, filters, sortKey!, sortOrder);
      setData(breweries);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBreweries();
  }, [page, perPage, filters, sortKey, sortOrder]);

  const columns = [
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
  ] as { key: keyof Brewery; title: string; sortable?: boolean; onSort?: () => void }[];

  const handleSort = (key: keyof Brewery) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (filterType: 'type' | 'search', value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPage(1);
  };

  return (
    <div>
      <div className={styles.filters}>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or city"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table data={data} columns={columns} />
          <div className={styles.pagination}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={data.length < perPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BreweryTable;
