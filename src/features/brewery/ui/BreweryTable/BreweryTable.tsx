import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './BreweryTable.module.scss';

// import LatitudeFilter from './filters/LatitudeFilter';

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

  // const handleLatitudeFilter = (minLatitude: number | null, maxLatitude: number | null) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     minLatitude: minLatitude ?? undefined,
  //     maxLatitude: maxLatitude ?? undefined,
  //   }));
  //   setPage(1);
  // };

  const columns: { key: keyof Brewery; title: string; sortable?: boolean; onSort?: () => void }[] = [
    { key: 'name', title: 'Name', sortable: true, onSort: () => handleSort('name') },
    { key: 'brewery_type', title: 'Type', sortable: true, onSort: () => handleSort('brewery_type') },
    { key: 'city', title: 'City' },
    { key: 'state', title: 'State' },
  ];
  

  return (
    <div className={styles.tableContainer}>
      <Filters filters={filters} setFilters={setFilters} setPage={setPage} />

      {/* <div className={styles.locationFilters}>
        <LatitudeFilter onApplyFilter={handleLatitudeFilter} />
      </div> */}

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
