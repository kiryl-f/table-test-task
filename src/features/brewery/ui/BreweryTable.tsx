import React, { useEffect, useState } from 'react';
import { Table } from '../../../shared/ui/Table';
import { fetchBreweries } from '../model/BreweryService';

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

  useEffect(() => {
    const loadBreweries = async () => {
      setLoading(true);
      const breweries = await fetchBreweries(1, 10);
      setData(breweries);
      setLoading(false);
    };

    loadBreweries();
  }, []);

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'type', title: 'Type' },
    { key: 'city', title: 'City' },
    { key: 'state', title: 'State' },
  ] as { key: keyof Brewery; title: string; sortable?: boolean }[];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table data={data} columns={columns} />
      )}
    </div>
  );
};

export default BreweryTable;
