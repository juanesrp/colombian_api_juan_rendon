import styles from "./EntityTable.module.css";

function EntityTable({ data, columns }) {
  if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.entityTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${index}-${column.key}`}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntityTable;
