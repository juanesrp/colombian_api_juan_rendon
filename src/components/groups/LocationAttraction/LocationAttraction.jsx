import React, { useEffect, useState } from "react";
import styles from "./LocationAttraction.module.css";
import { groupByLocationAttraction } from "../../../utils/dataProcessing";
import { fetchDepartments } from "../../../utils/api";

const LocationAttraction = ({ data }) => {
  const [departments, setDepartments] = useState([]);
  const [groupedByLocationAttraction, setGroupedByLocationAttraction] =
    useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
        const byLocationAttraction = Object.values(
          groupByLocationAttraction(data, departments)
        );

        setGroupedByLocationAttraction(byLocationAttraction);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Atracciones por ubicación</h3>
      <div className={styles.locationList}>
        {groupedByLocationAttraction.map(({ department, city, count }) => (
          <div key={`${department}-${city}`} className={styles.locationItem}>
            <div className={styles.locationInfo}>
              <span className={styles.department}>{department}</span>
              <span className={styles.city}>{city}</span>
            </div>
            <span className={styles.count}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationAttraction;
