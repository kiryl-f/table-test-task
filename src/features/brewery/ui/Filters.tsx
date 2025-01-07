import React from 'react';
import styles from '../../../styles/components/Filters.module.scss';

type FiltersProps = {
  filters: { type: string; search: string };
  setFilters: React.Dispatch<React.SetStateAction<{ type: string; search: string }>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, setPage }) => {
  const handleFilterChange = (filterType: 'type' | 'search', value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPage(1); 
  };

  return (
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
  );
};
