import React from "react";
import { groupByPresidentsParty } from "../../../utils/dataProcessing";
import styles from "./PresidentsParty.module.css";

const PresidentsParty = ({ data }) => {
  const groupedData = groupByPresidentsParty(data);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Presidentes por partido político:</h3>
      <ul className={styles.list}>
        {groupedData.map(({ party, count }) => (
          <li key={party} className={styles.listItem}>
            <span className={styles.partyName}>{party}</span>
            <span className={styles.partyCount}>{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresidentsParty;
