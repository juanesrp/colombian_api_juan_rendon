import React, { useEffect, useState } from "react";
import {
  fetchAirports,
  fetchAttractions,
  fetchPresidents,
} from "../../utils/api";
import PresidentsTab from "../../components/PresidentsTab/PresidentsTab";
import AirportsTab from "../../components/AirportsTab/AirportsTab";
import AttractionsTab from "../../components/AttractionsTab/AttractionsTab";
import styles from "./ColombiaDash.module.css";

const ColombiaDash = () => {
  const [activeTab, setActiveTab] = useState("presidents");
  const [presidents, setPresidents] = useState([]);
  const [airports, setAirports] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const presidents = await fetchPresidents();
        const airports = await fetchAirports();
        const attractions = await fetchAttractions();

        setPresidents(presidents);
        setAirports(airports);
        setAttractions(attractions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Colombia Dash</h1>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "presidents" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("presidents")}
        >
          Presidentes
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "airports" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("airports")}
        >
          Aeropuertos
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "attractions" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("attractions")}
        >
          Atracciones Turísticas
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === "presidents" && <PresidentsTab data={presidents} />}
        {activeTab === "airports" && <AirportsTab data={airports} />}
        {activeTab === "attractions" && <AttractionsTab data={attractions} />}
      </div>
    </div>
  );
};

export default ColombiaDash;
