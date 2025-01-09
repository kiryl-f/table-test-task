import styles from './Table.module.scss';

type TableProps<T> = {
  data: T[];
  columns: { key: keyof T; title: string; sortable?: boolean }[];
  onSort?: (key: keyof T) => void;
};

export const Table = <T,>({ data, columns, onSort }: TableProps<T>) => {
  
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && onSort?.(col.key)}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
