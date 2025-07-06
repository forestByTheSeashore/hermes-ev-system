// src/components/OrderInfo.js
import React from 'react';

function OrderInfo({ owner, payment, contact }) {
  return (
    <div className="order-info">
      <h3>Order Information</h3>
      <p><strong>Owner:</strong> {owner}</p>
      <p><strong>Payment:</strong> {payment}</p>
      <p><strong>Contact:</strong> {contact}</p>
    </div>
  );
}

export default OrderInfo;
