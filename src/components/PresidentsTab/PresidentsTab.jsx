import { groupByPresidentsParty } from "../../utils/dataProcessing";
import EntityCount from "../EntityCount/EntityCount";
import EntityTable from "../EntityTable/EntityTable";
import PresidentsParty from "../groups/PresidentsParty/PresidentsParty";

const PresidentsTab = ({ data }) => {
  console.log(Array.isArray(data));
  console.log(data.length);

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
    <>
      <EntityCount entityName={"Presidentes"} count={data.length} />
      <EntityTable data={data} columns={columns} entityName={"Presidentes"} />
      <PresidentsParty data={data} />
    </>
  );
};

export default PresidentsTab;
