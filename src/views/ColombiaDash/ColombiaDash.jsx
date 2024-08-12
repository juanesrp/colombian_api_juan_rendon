import React, { useEffect, useState } from "react";
import {
  fetchAirports,
  fetchAttractions,
  fetchPresidents,
} from "../../utils/api";
import PresidentsTab from "../../components/PresidentsTab/PresidentsTab";
import AirportsTab from "../../components/AirportsTab/AirportsTab";
import AttractionsTab from "../../components/AttractionsTab/AttractionsTab";

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
    <div>
      <h1>Colombia Dash</h1>
      <div>
        <button onClick={() => setActiveTab("presidents")}>Presidentes</button>
        <button onClick={() => setActiveTab("airports")}>Aeropuertos</button>
        <button onClick={() => setActiveTab("attractions")}>
          Atracciones Turisticas
        </button>
      </div>
      {activeTab === "presidents" && <PresidentsTab data={presidents} />}
      {activeTab === "airports" && <AirportsTab data={airports} />}
      {activeTab === "attractions" && <AttractionsTab data={attractions} />}
    </div>
  );
};

export default ColombiaDash;
