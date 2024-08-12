import styles from "./EntityCount.module.css";

const EntityCount = ({ entityName, count }) => {
  return (
    <div className={styles.entityCount}>
      <p className={styles.count}>{count}</p>
      <p className={styles.entityName}>{entityName}</p>
    </div>
  );
};

export default EntityCount;
