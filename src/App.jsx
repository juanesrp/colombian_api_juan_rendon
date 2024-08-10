import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchAirports, fetchAttractions, fetchPresidents } from "./utils/api";

function App() {
  const [presidents, setPresidents] = useState([]);
  const [airports, setAirports] = useState([]);
  const [attractions, setAttractions] = useState([]);

  console.log(presidents);
  console.log(airports);
  console.log(attractions);

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
    <>
      <div>
        <h1>Colombia Dash</h1>

        <h2>Presidentes</h2>
      </div>
    </>
  );
}

export default App;
