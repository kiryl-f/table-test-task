import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dataLength: number;
  perPage: number;
};

export const Pagination: React.FC<PaginationProps> = React.memo(({ page, setPage, dataLength, perPage }) => {
  return (
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
        disabled={dataLength < perPage}
      >
        Next
      </button>
    </div>
  );
});
