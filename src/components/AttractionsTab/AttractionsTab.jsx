import React, { useEffect, useState } from "react";
import EntityCount from "../EntityCount/EntityCount";
import EntityTable from "../EntityTable/EntityTable";
import LocationAttraction from "../groups/LocationAttraction/LocationAttraction";
import styles from "./AttractionsTab.module.css";
import { fetchDepartments } from "../../utils/api";

const AttractionsTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("list");
  const [proccessedData, setProcessedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await fetchDepartments();
        const departmentsMap = {};
        departments.forEach((department) => {
          departmentsMap[department.id] = department.name;
        });

        const newProccessedData = data.map((item) => ({
          ...item,
          departmentName: departmentsMap[item.city?.departmentId] || "N/A",
        }));
        setProcessedData(newProccessedData);
      } catch (error) {
        console.log(error);
        setProcessedData(data);
      }
    };
    fetchData();
  }, [data]);

  const columns = [
    { key: "name", header: "Nombre" },
    {
      key: "description",
      header: "Descripción",
      render: (item) => item.description.substring(0, 100) + "...",
    },
    {
      key: "departmentName",
      header: "Departamento",
    },
    {
      key: "city",
      header: "Ciudad",
      render: (item) => (item.city ? item.city.name : "N/A"),
    },
  ];

  return (
    <div className={styles.attractionsTab}>
      <EntityCount entityName={"Atracciones"} count={data.length} />

      <div className={styles.tabMenu}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "list" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("list")}
        >
          Lista de Atracciones
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "location" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("location")}
        >
          Agrupación por Ubicación
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "list" && (
          <EntityTable data={proccessedData} columns={columns} />
        )}
        {activeTab === "location" && <LocationAttraction data={data} />}
      </div>
    </div>
  );
};

export default AttractionsTab;
