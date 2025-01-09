import React from 'react';
import styles from './SearchFilter.module.scss';

type SearchFilterProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const SearchFilter: React.FC<SearchFilterProps> = React.memo(({ search, setSearch, setPage }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className={styles.searchFilter}>
      <h3>Search</h3>
      <input
        type="text"
        placeholder="Search by name or city"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
});
