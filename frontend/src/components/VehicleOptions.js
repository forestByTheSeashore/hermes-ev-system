// src/components/VehicleOptions.js
import React, { useState } from 'react';

function VehicleOptions({ onOptionChange }) {
  const [selectedVersion, setSelectedVersion] = useState('AWD');
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedWheel, setSelectedWheel] = useState('Standard');
  const [selectedTrim, setSelectedTrim] = useState('Black');

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
    onOptionChange('version', event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    onOptionChange('color', event.target.value);
  };

  const handleWheelChange = (event) => {
    setSelectedWheel(event.target.value);
    onOptionChange('wheel', event.target.value);
  };

  const handleTrimChange = (event) => {
    setSelectedTrim(event.target.value);
    onOptionChange('trim', event.target.value);
  };

  return (
    <div className="vehicle-options">
      <h3>Customization Options</h3>
      
      <div className="option">
        <label>Version</label>
        <select value={selectedVersion} onChange={handleVersionChange}>
          <option value="AWD">AWD</option>
          <option value="2WD">2WD</option>
          <option value="4WD">4WD</option>
        </select>
      </div>

      <div className="option">
        <label>Color</label>
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
        </select>
      </div>

      <div className="option">
        <label>Wheel</label>
        <select value={selectedWheel} onChange={handleWheelChange}>
          <option value="Standard">Standard</option>
          <option value="Sport">Sport</option>
        </select>
      </div>

      <div className="option">
        <label>Trim</label>
        <select value={selectedTrim} onChange={handleTrimChange}>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
      </div>
    </div>
  );
}

export default VehicleOptions;
