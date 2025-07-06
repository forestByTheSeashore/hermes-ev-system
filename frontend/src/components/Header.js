import React from 'react';
import './Header.css';
import logoImage from '../picture/logo.png';

function Header({ openAddModal }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="title">customer</span>
      </div>
      <button className="search-btn">🔍</button>
    </header>
  );
}

export default Header;
