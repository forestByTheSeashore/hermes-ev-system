import React, { useEffect } from 'react';
import './VehicleDetailPage.css';
import { useNavigate } from 'react-router-dom';

const VehicleDetailPage = () => {
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
    <div>
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
                  <button href="javascript:void(0);" id="contactUs">Contact Us</button>
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

      {/* Model Details */}
      <section id="model1" className="product-detail">
        <div className="product-header">
          <h1>Model 1: Advanced Vehicle</h1>
          <p>
            The future of automotive technology is here with Model 1, offering cutting-edge features
            and powerful performance.
          </p>
        </div>
        <div className="specs-table">
          <h2>Technical Specifications</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Model 1</th>
                <th>Model 2</th>
                <th>Model 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Engine Type</td>
                <td>V8 Turbo</td>
                <td>V6 Hybrid</td>
                <td>Electric Motor</td>
              </tr>
              <tr>
                <td>Max Power (hp)</td>
                <td>500</td>
                <td>400</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-description">
          <h2>Overview</h2>
          <p>
            The Model 1 offers a state-of-the-art V8 turbo engine, making it a true powerhouse on
            the road.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>Advanced Autonomous Driving Mode</li>
            <li>Infotainment System with Voice Control</li>
          </ul>
        </div>

        <div className="pricing">
          <h2>Pricing</h2>
          <p>The base price for Model 1 starts at $80,000 USD.</p>
        </div>
      </section>
      <section id="model2" className="product-detail">
        <div className="product-header">
          <h1>Model 2: Hybrid Powerhouse</h1>
          <p>
            The Model 2 is the perfect blend of power and efficiency, featuring a hybrid V6 engine for a smooth ride.
          </p>
        </div>
        <div className="specs-table">
          <h2>Technical Specifications</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Model 1</th>
                <th>Model 2</th>
                <th>Model 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Engine Type</td>
                <td>V8 Turbo</td>
                <td>V6 Hybrid</td>
                <td>Electric Motor</td>
              </tr>
              <tr>
                <td>Max Power (hp)</td>
                <td>500</td>
                <td>400</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-description">
          <h2>Overview</h2>
          <p>
            The Model 2 provides exceptional fuel efficiency with its hybrid technology, perfect for long-distance travel.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>Eco-friendly Hybrid System</li>
            <li>Advanced Safety Features</li>
          </ul>
        </div>

        <div className="pricing">
          <h2>Pricing</h2>
          <p>The base price for Model 2 starts at $60,000 USD.</p>
        </div>
      </section>

      <section id="model3" className="product-detail">
        <div className="product-header">
          <h1>Model 3: Electric Revolution</h1>
          <p>
            The Model 3 is a fully electric vehicle with cutting-edge technology and zero emissions.
          </p>
        </div>
        <div className="specs-table">
          <h2>Technical Specifications</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Model 1</th>
                <th>Model 2</th>
                <th>Model 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Engine Type</td>
                <td>V8 Turbo</td>
                <td>V6 Hybrid</td>
                <td>Electric Motor</td>
              </tr>
              <tr>
                <td>Max Power (hp)</td>
                <td>500</td>
                <td>400</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-description">
          <h2>Overview</h2>
          <p>
            The Model 3 redefines the electric vehicle market with exceptional range and unparalleled performance.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>Zero Emissions</li>
            <li>Long-Range Battery</li>
          </ul>
        </div>

        <div className="pricing">
          <h2>Pricing</h2>
          <p>The base price for Model 3 starts at $50,000 USD.</p>
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

export default VehicleDetailPage;
