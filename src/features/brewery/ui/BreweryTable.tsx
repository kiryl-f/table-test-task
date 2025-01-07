import React, { useEffect, useState } from 'react';
import { Table } from '../../../shared/ui/Table';
import { fetchBreweries } from '../model/BreweryService';
import styles from '../../../styles/components/BreweryTable.module.scss';

type Brewery = {
  id: string;
  name: string;
  type: string;
  city: string;
  state: string;
};

const BreweryTable: React.FC = () => {
  const [data, setData] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    const loadBreweries = async () => {
      setLoading(true);
      try {
        const breweries = await fetchBreweries(page, perPage);
        setData(breweries);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    loadBreweries();
  }, [page, perPage]);

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'brewery_type', title: 'Type' },
    { key: 'city', title: 'City' },
    { key: 'state', title: 'State' },
  ] as { key: keyof Brewery; title: string; sortable?: boolean }[];

  return (
    <div>
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
