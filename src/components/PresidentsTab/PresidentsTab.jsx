import React, { useState } from "react";
import { groupByPresidentsParty } from "../../utils/dataProcessing";
import EntityCount from "../EntityCount/EntityCount";
import EntityTable from "../EntityTable/EntityTable";
import PresidentsParty from "../groups/PresidentsParty/PresidentsParty";
import styles from "./PresidentsTab.module.css";

const PresidentsTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("list");

  const columns = [
    { key: "name", header: "Nombre" },
    { key: "lastName", header: "Apellido" },
    { key: "startPeriodDate", header: "Inicio de Periodo" },
    { key: "endPeriodDate", header: "Fin de Periodo" },
    { key: "politicalParty", header: "Partido Político" },
    {
      key: "description",
      header: "Descripción",
      render: (item) => item.description.substring(0, 100) + "...",
    },
  ];

  return (
    <div className={styles.presidentsTab}>
      <EntityCount entityName={"Presidentes"} count={data.length} />

      <div className={styles.tabMenu}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "list" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("list")}
        >
          Lista de Presidentes
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "party" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("party")}
        >
          Agrupación por Partido
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "list" && <EntityTable data={data} columns={columns} />}
        {activeTab === "party" && <PresidentsParty data={data} />}
      </div>
    </div>
  );
};

export default PresidentsTab;
