import React, { useEffect, useState } from "react";
import {
  groupByLocationAirport,
  groupByRegionDepartmentCityType,
} from "../../utils/dataProcessing";
import { fetchRegions } from "../../utils/api";
import EntityTable from "../EntityTable/EntityTable";
import EntityCount from "../EntityCount/EntityCount";
import LocationAirport from "../groups/LocationAirport/LocationAirport";
import RegionAirport from "../groups/RegionAirport/RegionAirport";
import styles from "./AirportsTab.module.css";

const AirportsTab = ({ data }) => {
  const [regions, setRegions] = useState([]);
  const [regionDepartmentCityType, setRegionDepartmentCityType] = useState({});
  const [activeTab, setActiveTab] = useState("list");
  const groupedByLocation = Object.values(groupByLocationAirport(data));

  console.log(regions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regions = await fetchRegions();
        setRegions(regions);
        const groupedByRegionDepartmentCityType =
          groupByRegionDepartmentCityType(data, regions);
        setRegionDepartmentCityType(groupedByRegionDepartmentCityType);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);

  const columns = [
    { key: "name", header: "Nombre" },
    {
      key: "department",
      header: "Departamento",
      render: (item) => (item.department ? item.department.name : "N/A"),
    },
    {
      key: "city",
      header: "Ciudad",
      render: (item) => (item.city ? item.city.name : "N/A"),
    },
    { key: "type", header: "Tipo" },
  ];

  return (
    <div className={styles.airportsTab}>
      <EntityCount entityName={"Aeropuertos"} count={data.length} />

      <div className={styles.tabMenu}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "list" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("list")}
        >
          Lista de Aeropuertos
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "location" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("location")}
        >
          Agrupación por Ubicación
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "region" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("region")}
        >
          Agrupación por Región
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "list" && <EntityTable data={data} columns={columns} />}
        {activeTab === "location" && (
          <LocationAirport groupedByLocation={groupedByLocation} />
        )}
        {activeTab === "region" && (
          <RegionAirport regionDepartmentCityType={regionDepartmentCityType} />
        )}
      </div>
      <pre>{JSON.stringify(regionDepartmentCityType, null, 2)}</pre>
    </div>
  );
};

export default AirportsTab;
