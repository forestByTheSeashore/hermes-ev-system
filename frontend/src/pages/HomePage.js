import React, { useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

// 导入图片资源
import Model4Image from '../assets/Model4.jpg';
import Model5Image from '../assets/Model5.jpg';
import Model6Image from '../assets/Model6.jpg';



const HomePage = () => {
  const navigate = useNavigate(); // 初始化 useNavigate
  useEffect(() => {
    // 添加下拉菜单和遮罩层的交互逻辑
    const navbarItems = document.querySelectorAll('.navbar-item');
    navbarItems.forEach((item) => {
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);

      item.addEventListener('mouseenter', () => {
        const dropdown = item.querySelector('.dropdown');
        if(dropdown){
          dropdown.style.display = 'block';
        setTimeout(() => {
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0)';
        }, 50);
        }
        

        overlay.style.display = 'block';
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 50);
      });

      item.addEventListener('mouseleave', () => {
        const dropdown = item.querySelector('.dropdown');
        if(dropdown){
          dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          dropdown.style.display = 'none';
        }, 300);
        }
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300);
      });
    });

    

    // "Contact Us" 点击事件
    const contactUs = document.getElementById('contactUs');
    if (contactUs) {
      contactUs.addEventListener('click', () => {
        alert(
          'Contact Information:\n\n' +
            'Email: contact@hermes.com\n' +
            'Phone: +123-456-7890\n' +
            'Address: 123 Hermes Street, Vehicle City, EV Land'
        );
      });
    }
  }, []);

  // 定义跳转函数
  const handleHomeClick = () => {
    navigate('/mainpage'); // 跳转到 
    window.location.reload();
  };
  const handleBuyNowClick = () => {
    navigate('/accessories'); // 跳转到 AccessoriesPage
    window.location.reload();
  };
  const handleLearnMoreClick = () => {
    navigate('/vehicle-detail'); // 跳转到 
    window.location.reload();
  };
  const handleProductDataClick = () => {
    navigate('/product-introduction'); // 跳转到 
    window.location.reload();
  };
  const handlePurchaseClick = () => {
    navigate('/accessories'); // 跳转到 
    window.location.reload();
  };
  const handleModelClick = () => {
    navigate('/vehicle-detail'); // 跳转到 
    window.location.reload();
  };
  const handleTermsOfServiceClick = () => {
    navigate('/terms-of-service'); // 跳转到 
    window.location.reload();
  };
  const handlePrivacyPolicyClick = () => {
    navigate('/privacy-policy'); // 跳转到 
    window.location.reload();
  };
  const handleUserInfoClick = () => {
    
      navigate('/user-info');
      window.location.reload();
    
  };
  
  




  return (
    <div classname="container">
      {/* Header Section */}
      <header className="header">
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <button onClick={handleHomeClick}>Home</button>
            </li>
            <li className="navbar-item">
              <button>Model1</button>
              <ul className="dropdown">
                <li><button onClick={handleProductDataClick} >Product Data</button></li>
                <li><button onClick={handlePurchaseClick}>Purchase</button></li>
              </ul>
            </li>
            <li className="navbar-item">
              <button>Model2</button>
              <ul className="dropdown">
                <li><button onClick={handleProductDataClick}>Product Data</button></li>
                <li><button onClick={handlePurchaseClick}>Purchase</button></li>
              </ul>
            </li>
            <li className="navbar-item">
              <button>Model3</button>
              <ul className="dropdown">
                <li><button onClick={handleProductDataClick}>Product Data</button></li>
                <li><button onClick={handlePurchaseClick}>Purchase</button></li>
              </ul>
            </li>
            <li className="navbar-item">
              <button>Products</button>
              <ul className="dropdown">
                <li><button onClick={handleModelClick}>Model1</button></li>
                <li><button onClick={handleModelClick}>Model2</button></li>
                <li><button onClick={handleModelClick}>Model3</button></li>
              </ul>
            </li>
            <li className="navbar-item">
              <button>Company</button>
              <ul className="dropdown">
                <li><button onClick={handleTermsOfServiceClick}>Terms of Service</button></li>
                <li><button onClick={handlePrivacyPolicyClick}>Privacy Policy</button></li>
                <li>
                  <button>Contact Us</button>
                </li>
              </ul>
            </li>
            <li className="navbar-item">
              <button>User</button>
              <ul className="dropdown">
                <li><button onClick={handleUserInfoClick}>Information</button></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Introducing the New Vehicle</h1>
          <p>The future of vehicles technology is here</p>
          <button onClick={handleLearnMoreClick} className="cta-button">Learn More</button>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="product-showcase">
        <div className="product-card">
          <img src={Model4Image} alt="Product 1" />
          <h3>Model 1</h3>
          <p>Advanced technology. Stunning design.</p>
          <button onClick={handleBuyNowClick} className="cta-button">Buy Now</button>
        </div>
        <div className="product-card">
          <img src={Model5Image} alt="Product 2" />
          <h3>Model 2</h3>
          <p>Power and performance in every task.</p>
          <button onClick={handleBuyNowClick} className="cta-button">Buy Now</button>
        </div>
        <div className="product-card">
          <img src={Model6Image} alt="Product 3" />
          <h3>Model 3</h3>
          <p>Perfect blend of style and health features.</p>
          <button onClick={handleBuyNowClick} className="cta-button">Buy Now</button>
          
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Hermes. All rights reserved.</p>
        <ul className="footer-links">
          <li><button onClick={handlePrivacyPolicyClick}>Provate Policy</button></li>
          <li><button onClick={handleTermsOfServiceClick}>Terms of service</button></li>
          <li><button href="javascript:void(0);" id="contactUs">Contact Us</button></li>
        </ul>
      </footer>
    </div>

    
  );
};

export default HomePage;
