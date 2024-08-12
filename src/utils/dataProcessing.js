export const groupByPresidentsParty = (data) => {
  const groupedByParty = {};

  data.forEach((president) => {
    const party = president.politicalParty;
    if (groupedByParty[party]) {
      groupedByParty[party] += 1;
    } else {
      groupedByParty[party] = 1;
    }
  });

  const resultArray = [];
  for (const party in groupedByParty) {
    resultArray.push({ party: party, count: groupedByParty[party] });
  }

  resultArray.sort((a, b) => b.count - a.count);

  return resultArray;
};

export const groupByLocationAirport = (data) => {
  const groupedByLocationAirport = {};

  data.forEach((item) => {
    const key = item.department.id + "-" + item.city.name;
    if (groupedByLocationAirport[key]) {
      groupedByLocationAirport[key].count += 1;
    } else {
      groupedByLocationAirport[key] = {
        department: item.department.name,
        city: item.city.name,
        count: 1,
      };
    }
  });

  return groupedByLocationAirport;
};

export const groupByLocationAttraction = (data) => {
  const groupedByLocationAttraction = {};

  data.forEach((item) => {
    const key = item.city.departmentId + "-" + item.city.name;
    if (groupedByLocationAttraction[key]) {
      groupedByLocationAttraction[key].count += 1;
    } else {
      groupedByLocationAttraction[key] = {
        department: item.city.departmentId,
        city: item.city.name,
        count: 1,
      };
    }
  });
  console.log(groupedByLocationAttraction);
  return groupedByLocationAttraction;
};

export const groupByRegionDepartmentCityType = (airports, regions) => {
  const groupedData = {};

  // Crear un mapa de regiones para acceso rápido
  const regionsMap = {};
  regions.forEach((region) => {
    regionsMap[region.id] = region.name.toLowerCase();
  });

  airports.forEach((airport) => {
    const { type, department, city } = airport;
    const regionName = regionsMap[department.regionId];

    // Inicializar región si no existe
    if (!groupedData[regionName]) {
      groupedData[regionName] = { departamento: {} };
    }

    // Inicializar departamento si no existe
    if (!groupedData[regionName].departamento[department.name.toLowerCase()]) {
      groupedData[regionName].departamento[department.name.toLowerCase()] = {
        ciudad: {},
      };
    }

    // Inicializar ciudad si no existe
    if (
      !groupedData[regionName].departamento[department.name.toLowerCase()]
        .ciudad[city.name.toLowerCase()]
    ) {
      groupedData[regionName].departamento[
        department.name.toLowerCase()
      ].ciudad[city.name.toLowerCase()] = { tipo: {} };
    }

    // Inicializar tipo si no existe y aumentar el conteo
    if (
      !groupedData[regionName].departamento[department.name.toLowerCase()]
        .ciudad[city.name.toLowerCase()].tipo[type.toLowerCase()]
    ) {
      groupedData[regionName].departamento[
        department.name.toLowerCase()
      ].ciudad[city.name.toLowerCase()].tipo[type.toLowerCase()] = 0;
    }

    groupedData[regionName].departamento[department.name.toLowerCase()].ciudad[
      city.name.toLowerCase()
    ].tipo[type.toLowerCase()] += 1;
  });

  console.log("groupedData", groupedData);

  return groupedData;
};
