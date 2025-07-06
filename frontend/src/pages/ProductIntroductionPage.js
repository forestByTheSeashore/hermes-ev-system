import React, { useEffect } from 'react';
import './ProductIntroductionPage.css';
import { useNavigate } from 'react-router-dom';

// 动态导入图片资源
import Model1Image1 from '../assets/Model1-1.png';
import Model1Image2 from '../assets/Model1-2.png';
import Model1Image3 from '../assets/Model1-3.png';
import Model2Image1 from '../assets/Model2-1.png';
import Model2Image2 from '../assets/Model2-2.png';
import Model2Image3 from '../assets/Model2-3.png';
import Model3Image1 from '../assets/Model3-1.png';
import Model3Image2 from '../assets/Model3-2.png';
import Model3Image3 from '../assets/Model3-3.png';

const ProductIntroductionPage = () => {
  const navigate = useNavigate(); // 初始化 useNavigate
  const models = [
    {
      name: 'Model 1',
      images: [Model1Image1, Model1Image2, Model1Image3],
    },
    {
      name: 'Model 2',
      images: [Model2Image1, Model2Image2, Model2Image3],
    },
    {
      name: 'Model 3',
      images: [Model3Image1, Model3Image2, Model3Image3],
    },
  ];

  useEffect(() => {
    // Image slider functionality
    models.forEach((_, idx) => {
      const slider = document.querySelectorAll('.image-slider')[idx];
      const images = Array.from(slider.children);
      const prevBtn = document.querySelectorAll('.prev-btn')[idx];
      const nextBtn = document.querySelectorAll('.next-btn')[idx];
      let currentIndex = 0;

      const showImage = (index) => {
        if (index < 0) {
          currentIndex = images.length - 1;
        } else if (index >= images.length) {
          currentIndex = 0;
        } else {
          currentIndex = index;
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      };

      prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
      nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

      // Initialize slider
      showImage(currentIndex);
    });

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

    // Contact Us functionality
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
  const handleOrderNowClick = () => {
    navigate('/accessories'); // 跳转到 AccessoriesPage
    window.location.reload();
  };
  const handleDetailClick = () => {
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
      {/* Background Gradient */}
      <div className="gradient-bg"></div>

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

      {/* Main Section */}
      <main>
        {models.map((model, idx) => (
          <section key={idx} className="model">
            <h2>{model.name}</h2>
            <div className="image-container">
              <div className="image-slider">
                {model.images.map((image, imageIdx) => (
                  <img
                    key={imageIdx}
                    src={image}
                    alt={`${model.name} Image ${imageIdx + 1}`}
                    className="model-image"
                  />
                ))}
              </div>
              <button className="slider-btn prev-btn">&#10094;</button>
              <button className="slider-btn next-btn">&#10095;</button>
            </div>
            <div className="car-specs">
              <table>
                <tbody>
                  <tr>
                    <td><strong>Range:</strong></td>
                    <td>650 km</td>
                  </tr>
                  <tr>
                    <td><strong>Acceleration:</strong></td>
                    <td>2.7 s</td>
                  </tr>
                  <tr>
                    <td><strong>Top Speed:</strong></td>
                    <td>270 km/h</td>
                  </tr>
                  <tr>
                    <td><strong>Peak Power:</strong></td>
                    <td>900 HP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={handleOrderNowClick} >Order Now</button>
            <button onClick={handleDetailClick} >More Detail</button>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ProductIntroductionPage;
