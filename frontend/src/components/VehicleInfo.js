// src/components/VehicleInfo.js
import React from 'react';

function VehicleInfo({ vehicleName, version }) {
  return (
    <div className="vehicle-info">
      <h2>Vehicle Information</h2>
      <p><strong>Name:</strong> {vehicleName}</p>
      <p><strong>Version:</strong> {version}</p>
    </div>
  );
}

export default VehicleInfo;
