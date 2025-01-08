import React, { useState } from 'react';

import styles from './LatitudeFIlter.module.scss';

type LatitudeFilterProps = {
  onApplyFilter: (minLatitude: number | null, maxLatitude: number | null) => void;
};

const LatitudeFilter: React.FC<LatitudeFilterProps> = ({ onApplyFilter }) => {
  const [minLatitude, setMinLatitude] = useState<string>('');
  const [maxLatitude, setMaxLatitude] = useState<string>('');

  const applyFilter = () => {
    const min = minLatitude ? parseFloat(minLatitude) : null;
    const max = maxLatitude ? parseFloat(maxLatitude) : null;
    onApplyFilter(min, max);
  };

  return (
    <div className={styles.latitudeFilter}>
      <h3>Latitude Filter</h3>
      <div className={styles.latitudeRange}>
        <input
          type="number"
          placeholder="Min Latitude"
          value={minLatitude}
          onChange={(e) => setMinLatitude(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Max Latitude"
          value={maxLatitude}
          onChange={(e) => setMaxLatitude(e.target.value)}
          className={styles.input}
        />
      </div>
      <button onClick={applyFilter} className={styles.applyButton}>
        Apply Latitude Filter
      </button>
    </div>
  );
};

export default LatitudeFilter;
