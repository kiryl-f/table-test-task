import React from 'react';
import styles from './TypeFilter.module.scss';

type TypeFilterProps = {
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const TypeFilter: React.FC<TypeFilterProps> = ({ types, setTypes, setPage }) => {
  const handleTypeFilterChange = (type: string) => {
    setTypes((prev) => {
      const newTypes = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
      return newTypes;
    });
    setPage(1);
  };

  return (
    <div className={styles.typeFilter}>
      <h3>Filter by Type</h3>
      {['micro', 'regional', 'brewpub', 'nano', 'large', 'planning'].map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            checked={types.includes(type)}
            onChange={() => handleTypeFilterChange(type)}
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </div>
  );
};
