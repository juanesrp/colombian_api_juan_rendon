import React from "react";
import styles from "./RegionAirport.module.css";

const RegionAirport = ({ regionDepartmentCityType }) => {
  // Aplanar la estructura de datos
  const flattenedData = [];

  Object.entries(regionDepartmentCityType?.region ?? {}).forEach(
    ([region, departments]) => {
      Object.entries(departments?.departamento ?? {}).forEach(
        ([department, cities]) => {
          Object.entries(cities?.ciudad ?? {}).forEach(([city, types]) => {
            Object.entries(types?.tipo ?? {}).forEach(([type, count]) => {
              flattenedData.push({
                region,
                department,
                city,
                type,
                count,
              });
            });
          });
        }
      );
    }
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Agrupamiento por región, departamento, ciudad y tipo
      </h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Región</th>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Tipo</th>
            <th>Conteo</th>
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((item, index) => (
            <tr key={index}>
              <td>{item.region}</td>
              <td>{item.department}</td>
              <td>{item.city}</td>
              <td>{item.type}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegionAirport;
