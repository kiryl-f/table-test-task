import React from 'react';
import styles from './Filters.module.scss';
import { TypeFilter } from './Filters/TypeFilter';
import { SearchFilter } from './Filters/SearchFilter';


type FiltersProps = {
  filters: {
    types: string[];
    search: string;
    minLatitude?: number;
    maxLatitude?: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      types: string[];
      search: string;
      minLatitude?: number;
      maxLatitude?: number;
    }>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, setPage }) => {
  const setTypes: React.Dispatch<React.SetStateAction<string[]>> = (types) =>
    setFilters((prev) => ({
      ...prev,
      types: typeof types === 'function' ? types(prev.types) : types,
    }));

    const setSearch: React.Dispatch<React.SetStateAction<string>> = (search) =>
      setFilters((prev) => ({
        ...prev,
        search: typeof search === 'function' ? search(prev.search) : search,
      }));

  return (
    <div className={styles.filters}>
      <TypeFilter types={filters.types} setTypes={setTypes} setPage={setPage} />
      <SearchFilter search={filters.search} setSearch={setSearch} setPage={setPage} />
    </div>
  );
};
