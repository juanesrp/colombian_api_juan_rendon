import { useEffect, useState } from "react";
import {
  groupByLocationAirport,
  groupByRegionDepartmentCityType,
} from "../../utils/dataProcessing";
import { fetchRegions } from "../../utils/api";
import EntityTable from "../EntityTable/EntityTable";

const AirportsTab = ({ data }) => {
  const [regions, setRegions] = useState([]);
  const [regionDepartmentCityType, setRegionDepartmentCityType] = useState({});
  const groupedByLocation = Object.values(groupByLocationAirport(data));

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
  }, []);

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
    <>
      <h2>Aeropuertos</h2>
      <p>Total de aeropuertos: {data.length}</p>
      <h3>Aeropuertos por ubicación:</h3>
      <ul>
        {groupedByLocation.map(({ department, city, count }) => (
          <li key={`${department}-${city}`}>
            {department}, {city}, {count}
          </li>
        ))}
      </ul>
      <h3>Lista de aeropuertos:</h3>
      <EntityTable data={data} columns={columns} />
      <h3>Agrupamiento por region, departamento, ciudad y tipo:</h3>
      <pre>{JSON.stringify(regionDepartmentCityType, null, 2)}</pre>
    </>
  );
};

export default AirportsTab;
