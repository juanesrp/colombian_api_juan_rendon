export const groupByPresidentsParty = (data) => {
  const groupedByParty = {};

  data.forEach((president) => {
    const party = president.politicalParty.toUpperCase();
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
  return groupedByLocationAttraction;
};

export const groupByRegionDepartmentCityType = (airports, regions) => {
  const groupedData = { region: {} };

  // Crea objeto para mapear las regiones con su id y nombre
  const regionsMap = {};
  regions.forEach((region) => {
    regionsMap[region.id] = region.name.toLowerCase();
  });

  airports.forEach((airport) => {
    const { type, department, city } = airport;
    const regionName = regionsMap[department.regionId];

    // Cada uno d elos if, inicializa la propiedad si no existe
    if (!groupedData.region[regionName]) {
      groupedData.region[regionName] = { departamento: {} };
    }

    if (
      !groupedData.region[regionName].departamento[
        department.name.toLowerCase()
      ]
    ) {
      groupedData.region[regionName].departamento[
        department.name.toLowerCase()
      ] = { ciudad: {} };
    }

    if (
      !groupedData.region[regionName].departamento[
        department.name.toLowerCase()
      ].ciudad[city.name.toLowerCase()]
    ) {
      groupedData.region[regionName].departamento[
        department.name.toLowerCase()
      ].ciudad[city.name.toLowerCase()] = { tipo: {} };
    }

    // Inicializar tipo si no existe y aumentar el conteo
    if (
      !groupedData.region[regionName].departamento[
        department.name.toLowerCase()
      ].ciudad[city.name.toLowerCase()].tipo[type.toLowerCase()]
    ) {
      groupedData.region[regionName].departamento[
        department.name.toLowerCase()
      ].ciudad[city.name.toLowerCase()].tipo[type.toLowerCase()] = 0;
    }

    groupedData.region[regionName].departamento[
      department.name.toLowerCase()
    ].ciudad[city.name.toLowerCase()].tipo[type.toLowerCase()] += 1;
  });

  console.log("groupedData", groupedData);

  return groupedData;
};
