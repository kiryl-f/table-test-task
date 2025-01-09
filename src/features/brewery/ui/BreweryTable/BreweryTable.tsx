import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './BreweryTable.module.scss';
// import RenderCounter from './RenderCounter'; 

import { Table } from '../../../../shared/ui/Table/Table';
import { Filters } from '../Filters';
import { Pagination } from '../Pagination/Pagination';
import { Brewery } from '../../types';
import useBreweryTableState from '../../hooks/useBreweryTableState';
import useBreweryLoader from '../../hooks/useBreweryLoader';

const BreweryTable: React.FC = () => {
  const [searchParams] = useSearchParams();

  const {
    filters,
    setFilters,
    page,
    setPage,
    sortKey,
    handleSort,
  } = useBreweryTableState(searchParams);

  const { data, loading, loadBreweries } = useBreweryLoader(page, filters, sortKey);

  useEffect(() => {
    loadBreweries();
  }, [page, filters, sortKey]);

  const memoizedHandleSort = useCallback((key: keyof Brewery) => handleSort(key), [handleSort]);

  const columns = useMemo(() => {
    return [
      { key: 'name' as keyof Brewery, title: 'Name', sortable: true, onSort: () => memoizedHandleSort('name') },
      { key: 'brewery_type' as keyof Brewery, title: 'Type', sortable: true, onSort: () => memoizedHandleSort('brewery_type') },
      { key: 'city' as keyof Brewery, title: 'City' },
      { key: 'state' as keyof Brewery, title: 'State' },
    ];
  }, [memoizedHandleSort]);


  return (
    <div className={styles.tableContainer}>
      {/* <RenderCounter /> */}
      <Filters filters={filters} setFilters={setFilters} setPage={setPage} />
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <>
          <Table data={data} columns={columns} />
          <Pagination page={page} setPage={setPage} dataLength={data.length} perPage={20} />
        </>
      )}
    </div>
  );
};

export default BreweryTable;
