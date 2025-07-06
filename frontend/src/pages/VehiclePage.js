import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import VehicleInfo from '../components/VehicleInfo';
import VehicleOptions from '../components/VehicleOptions';
import OrderInfo from '../components/OrderInfo';
import Footer from '../components/Footer';
import './VehiclePage.css';
import vehicleImage from '../picture/vehicle.png';
import colorImage from '../picture/color.png';
import trimImage from '../picture/trim.png';
import wheelImage from '../picture/wheel.png';

function VehiclePage() {
  const [vehicle, setVehicle] = useState({
    name: 'Myth 2',
    version: 'AWD',
    color: 'White',
    wheel: 'Standard',
    trim: 'Black'
  });

  const [order, setOrder] = useState([]); // Modified to handle multiple orders

  // Fetch order data from the API
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          'http://phphermesbackendv2-env.us-east-1.elasticbeanstalk.com/customer.php/orders/customer/1',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          setOrder(data.data); // Update order state with fetched data
        } else {
          console.error('Failed to fetch order information:', data.message);
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
        alert('Failed to fetch order data. Please try again later.');
      }
    };

    fetchOrderData();
  }, []);

  const handleOptionChange = (option, value) => {
    setVehicle((prevState) => ({
      ...prevState,
      [option]: value
    }));
  };

  return (
    <div className="vehicle-page">
      <Header />
      {/* Vehicle display with image */}
      <div className="vehicle-header">
        <img
          src={vehicleImage}
          alt={`Myth 2 ${vehicle.color}`}
          className="vehicle-image"
        />
      </div>

      {/* Vehicle details section */}
      <div className="vehicle-details">
        {/* Vehicle Version and Right Info */}
        <div className="info-section">
          <div className="info-title">Vehicle Version</div>
          <div className="info-content">
            <div className="info-column">
              <span>AWD</span>
              <span>700 battery (kWh)</span>
              <span>200 max speed</span>
            </div>
          </div>
        </div>

        {/* Vehicle Color and Image */}
        <div className="info-section">
          <div className="info-title">Vehicle Color</div>
          <div className="info-content">
            <div className="image-column">
              <img src={colorImage} alt={`${vehicle.color} color`} className="color-image" />
            </div>
          </div>
        </div>

        {/* Wheel Hub */}
        <div className="info-section">
          <div className="info-title">Wheel Hub</div>
          <div className="info-content">
            <div className="image-column">
              <img src={wheelImage} alt={`${vehicle.color} color`} className="color-image" />
            </div>
          </div>
        </div>

        {/* Vehicle Trim */}
        <div className="info-section">
          <div className="info-title">Vehicle Trim</div>
          <div className="info-content">
            <div className="image-column">
              <img src={trimImage} alt={`${vehicle.color} color`} className="color-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Split layout: Vehicle info and Order info */}
      <div className="vehicle-and-order">
        <div className="details">
          <VehicleInfo vehicleName={vehicle.name} version={vehicle.version} />
          <VehicleOptions onOptionChange={handleOptionChange} />
        </div>
        <div className="order-info">
          {order.length > 0 ? (
            order.map((item, index) => (
              <OrderInfo
                key={index}
                storeId={item.store_id}
                customerId={item.customer_id}
                orderDate={item.order_date}
                deliveryDate={item.delivery_date}
                modelId={item.model_id}
                vehicleId={item.vehicle_id}
              />
            ))
          ) : (
            <p>Loading order information...</p>
          )}
        </div>
      </div>

      {/* Buttons for Subscribe Now and Shopping Cart */}
      <div className="action-buttons">
        <button className="subscribe-btn">Subscribe Now</button>
        <button className="cart-btn">Shopping Cart</button>
      </div>

      {/* Footer with unordered list */}
      <Footer />
    </div>
  );
}

export default VehiclePage;