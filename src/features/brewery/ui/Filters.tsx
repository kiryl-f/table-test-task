import React from 'react';
import styles from '../../../styles/components/Filters.module.scss';

type FiltersProps = {
  filters: {
    types: string[];
    search: string;
    minLongitude?: number;
    maxLongitude?: number;
    minLatitude?: number;
    maxLatitude?: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      types: string[];
      search: string;
      minLongitude?: number;
      maxLongitude?: number;
      minLatitude?: number;
      maxLatitude?: number;
    }>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, setPage }) => {
  const handleTypeFilterChange = (type: string) => {
    setFilters((prev) => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];
      return {
        ...prev,
        types: newTypes,
      };
    });
    setPage(1);
  };

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string | number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setPage(1);
  };

  return (
    <div className={styles.filters}>

      <div className={styles.typeFilter}>
        <h3>Filter by Type</h3>
        <label>
          <input
            type="checkbox"
            checked={filters.types.includes('micro')}
            onChange={() => handleTypeFilterChange('micro')}
          />
          Micro
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.types.includes('regional')}
            onChange={() => handleTypeFilterChange('regional')}
          />
          Regional
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.types.includes('brewpub')}
            onChange={() => handleTypeFilterChange('brewpub')}
          />
          Brewpub
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.types.includes('nano')}
            onChange={() => handleTypeFilterChange('nano')}
          />
          Nano
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.types.includes('large')}
            onChange={() => handleTypeFilterChange('large')}
          />
          Large
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.types.includes('planning')}
            onChange={() => handleTypeFilterChange('planning')}
          />
          Planning
        </label>
      </div>

      <div className={styles.searchFilter}>
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search by name or city"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      <div className={styles.numericFilters}>
        <h3>Filter by Coordinates</h3>
        <label>
          Min Longitude:
          <input
            type="number"
            value={filters.minLongitude ?? ''}
            onChange={(e) =>
              handleFilterChange('minLongitude', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </label>
        <label>
          Max Longitude:
          <input
            type="number"
            value={filters.maxLongitude ?? ''}
            onChange={(e) =>
              handleFilterChange('maxLongitude', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </label>
        <label>
          Min Latitude:
          <input
            type="number"
            value={filters.minLatitude ?? ''}
            onChange={(e) =>
              handleFilterChange('minLatitude', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </label>
        <label>
          Max Latitude:
          <input
            type="number"
            value={filters.maxLatitude ?? ''}
            onChange={(e) =>
              handleFilterChange('maxLatitude', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </label>
      </div>
    </div>
  );
};
