import { groupByLocationAttraction } from "../../utils/dataProcessing";
import EntityCount from "../EntityCount/EntityCount";
import EntityTable from "../EntityTable/EntityTable";
import LocationAttraction from "../groups/LocationAttraction/LocationAttraction";

const AttractionsTab = ({ data }) => {
  console.log(Array.isArray(data));

  const columns = [
    { key: "name", header: "Nombre" },
    {
      key: "description",
      header: "Descripción",
      render: (item) => item.description.substring(0, 100) + "...",
    },
    {
      key: "city",
      header: "Ciudad",
      render: (item) => (item.city ? item.city.name : "N/A"),
    },
  ];

  return (
    <>
      <h2>Atracciones</h2>
      <EntityCount entityName={"Atracciones"} count={data.length} />
      <h3>Lista de atracciones:</h3>
      <EntityTable data={data} columns={columns} />
      <LocationAttraction data={data} />
    </>
  );
};

export default AttractionsTab;
