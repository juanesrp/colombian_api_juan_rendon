import React from "react";
import styles from "./LocationAirport.module.css";

const LocationAirport = ({ groupedByLocation }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Aeropuertos por ubicación</h3>
      <div className={styles.locationGrid}>
        {groupedByLocation.map(({ department, city, count }) => (
          <div key={`${department}-${city}`} className={styles.locationCard}>
            <div className={styles.locationInfo}>
              <span className={styles.department}>{department}</span>
              <span className={styles.city}>{city}</span>
            </div>
            <div className={styles.countBadge}>{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationAirport;
