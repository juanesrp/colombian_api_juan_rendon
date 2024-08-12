import { useEffect, useState } from "react";
import {
  groupByLocationAirport,
  groupByRegionDepartmentCityType,
} from "../../utils/dataProcessing";
import { fetchRegions } from "../../utils/api";
import EntityTable from "../EntityTable/EntityTable";
import EntityCount from "../EntityCount/EntityCount";
import LocationAirport from "../groups/LocationAirport/LocationAirport";
import RegionAirport from "../groups/RegionAirport/RegionAirport";

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
      <EntityCount entityName={"Aeropuertos"} count={data.length} />
      <EntityTable data={data} columns={columns} entityName={"Aeropuertos"} />
      <LocationAirport groupedByLocation={groupedByLocation} />
      <RegionAirport regionDepartmentCityType={regionDepartmentCityType} />
    </>
  );
};

export default AirportsTab;
