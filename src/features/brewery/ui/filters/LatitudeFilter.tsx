import React, { useState } from 'react';

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
    <div>
      <input
        type="number"
        placeholder="Min Latitude"
        value={minLatitude}
        onChange={(e) => setMinLatitude(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Latitude"
        value={maxLatitude}
        onChange={(e) => setMaxLatitude(e.target.value)}
      />
      <button onClick={applyFilter}>Apply Latitude Filter</button>
    </div>
  );
};

export default LatitudeFilter;
