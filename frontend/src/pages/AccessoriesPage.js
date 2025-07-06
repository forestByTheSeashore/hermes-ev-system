import React, { useState, useEffect } from 'react';
import './AccessoriesPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 导入图片资源
import DefaultImage from '../assets/default.png';
import Model1Image from '../assets/Model1.jpg';
import Model2Image from '../assets/Model2.jpg';
import Model3Image from '../assets/Model3.jpg';
import BlackCarImage from '../assets/black-car.png';
import WhiteCarImage from '../assets/white-car.png';
import RedCarImage from '../assets/red-car.png';
import BlueCarImage from '../assets/blue-car.png';
import SilverCarImage from '../assets/silvery-car.png';

const AccessoriesPage = () => {
  const navigate = useNavigate(); // 初始化 useNavigate
  const [previewSrc, setPreviewSrc] = useState(DefaultImage); // 默认预览图片
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isPurchaseDisabled, setIsPurchaseDisabled] = useState(true);

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
    updatePurchaseButtonState();
  }, [selectedOptions]);

  // 处理选项点击
  const handleOptionClick = (section, value, preview) => {
    setSelectedOptions((prev) => ({ ...prev, [section]: value }));
    setPreviewSrc(preview); // 更新预览图片
  };

  // 更新总结信息和购买按钮状态
  const updatePurchaseButtonState = () => {
    const requiredSections = ["Model", "Color","Tires","Seats","Navigation","Style"];
    const allSelected = requiredSections.every((section) => selectedOptions[section]);
    setIsPurchaseDisabled(!allSelected);
  };

  // 处理购买按钮点击
  const handleSubmitPurchaseClick = async () => {
    const { Model, Color, Tires,Seats,Navigation,Style} = selectedOptions;
  
    // 确定车型编号
    const ModelMap = {
      "Model 1": "1",
      "Model 2": "2",
      "Model 3": "3",
    };
  
    // 确定颜色编号
    const ColorMap = {
      black: "1",
      white: "2",
      red: "3",
      blue: "4",
      silver: "5",
    };

    const TiresMap = {
      "Passenger Tires": "1",
      "Off-Road Tires": "2",
      "Sport Tires": "3",
      "Winter Tires": "4",
    };

    const SeatsMap = {
      "Leather Seats": "1",
      "Sports Seats": "2",
      "Luxury Seats": "3",
      "Fabric Seats": "4",
    };

    const NavigationMap = {
      "GPS": "1",
      "GLONASS": "2",
      "Galile": "3",
      "BeiDou": "4",
    };

    const StyleMap = {
      "Simple Style": "1",
      "Luxury Style": "2",
      "Sporty Style": "3",
    };
  
    const userId = parseInt(localStorage.getItem('customer_id'), 10); // 转换为整数

// 动态生成 order_id
    const currentYear = new Date().getFullYear(); // 获取当前年份
    const randomNumber = Math.floor(Math.random() * 100); // 生成 10 到 99 的随机两位数
    let orderIdString = `${ModelMap[Model]}${ColorMap[Color]}${TiresMap[Tires]}${SeatsMap[Seats]}${NavigationMap[Navigation]}${StyleMap[Style]}${userId}${randomNumber}`;

    // 去掉非数字部分并转换为整数
    let orderId = parseInt(orderIdString.replace(/\D/g, ''), 10); // 将非数字字符替换为空字符串，并转换为整数

    // 检查 orderId 是否在安全整数范围内，如果超出则删除最后一位，直到符合范围为止
    while (orderId > Number.MAX_SAFE_INTEGER) {
      orderIdString = orderIdString.slice(0, -1); // 删除字符串的最后一位
      orderId = parseInt(orderIdString.replace(/\D/g, ''), 10); // 重新转换为整数
    }

    // 获取当前日期
    const currentDate = new Date();

    // 格式化日期为字符串（YYYY-MM-DD）
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1，并确保是两位数
      const day = String(date.getDate()).padStart(2, '0'); // 确保是两位数
      return `${year}-${month}-${day}`;
    };

    // 动态生成日期
    const orderDate = formatDate(currentDate); // 当前日期
    const deliveryDate = formatDate(new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000)); // 当前日期加 15 天

    // 模拟订单数据
    const orderData = {
      order_id: orderId, // 使用动态生成并转换为整数的 order_id
      customer_id: userId, // 确保 customer_id 是整数
      store_id: 1,
      order_date: orderDate, // 使用动态生成的当前日期
      delivery_date: deliveryDate, // 使用动态生成的加 15 天的日期
      total_amount: "999.99",
      status: "Completed",
    };
  
    try {
      alert(`Order Data：\n${JSON.stringify(orderData, null, 2)}`);
      const response = await axios.post(
        "http://phphermesbackendv2-env.us-east-1.elasticbeanstalk.com/salesman.php/createOrder/1",
        orderData
      );
      alert(`Return Data：\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      if (error.response) {
        alert(`Failed to create order：\n${error.message}`);
      } else if (error.request) {
        alert("Fetch failed");
      } else {
        alert(`Error：\n${error.message}`);
      }
    }
  };

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
    <div className="container">
      {/* 导航栏 */}
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

      {/* 左侧预览区域 */}
      <div className="preview-area">
        <img src={previewSrc} alt="default-image" id="preview-image" />
      </div>

      {/* 右侧选购选项区域 */}
      <div className="options-area">
        <h1>Choose your accessories</h1>

        {/* 车型 */}
        <section className="selection-section">
          <h2>Model</h2>
          <div className="options">
            <div
              className={`option ${selectedOptions["Model"] === "Model 1" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Model", "Model 1", Model1Image)}
            >
              <span className="title">Model 1</span>
              <p className="description">Innovation at Its Core.</p>
            </div>
            <div
              className={`option ${selectedOptions["Model"] === "Model 2" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Model", "Model 2", Model2Image)}
            >
              <span className="title">Model 2</span>
              <p className="description">Meet Elegance All the Time.</p>
            </div>
            <div
              className={`option ${selectedOptions["Model"] === "Model 3" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Model", "Model 3", Model3Image)}
            >
              <span className="title">Model 3</span>
              <p className="description">Powerful, yet Refined.</p>
            </div>
          </div>
        </section>

        {/* 颜色 */}
        <section className="selection-section">
          <h2>Color</h2>
          <div className="options">
            <div
              className={`option color-option black ${
                selectedOptions["Color"] === "black" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("Color", "black", BlackCarImage)}
            ></div>
            <div
              className={`option color-option white ${
                selectedOptions["Color"] === "white" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("Color", "white", WhiteCarImage)}
            ></div>
            <div
              className={`option color-option red ${
                selectedOptions["Color"] === "red" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("Color", "red", RedCarImage)}
            ></div>
            <div
              className={`option color-option blue ${
                selectedOptions["Color"] === "blue" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("Color", "blue", BlueCarImage)}
            ></div>
            <div
              className={`option color-option silver ${
                selectedOptions["Color"] === "silver" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("Color", "silver", SilverCarImage)}
            ></div>
          </div>
        </section>

        {/* 轮胎 */}
        <section className="selection-section">
          <h2>Tires</h2>
          <div className="options">
            <div
              className={`option ${selectedOptions["Tires"] === "Passenger Tires" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Tires", "Passenger Tires", DefaultImage)}
            >
              <span className="title">Passenger Tires</span>
              <p className="description">Smooth Sailing, Every Day.</p>
            </div>
            <div
              className={`option ${selectedOptions["Tires"] === "Off-Road Tires" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Tires", "Off-Road Tires", DefaultImage)}
            >
              <span className="title">Off-Road Tires</span>
              <p className="description">Anywhere, Anytime, Adventure Awaits.</p>
            </div>
            <div
              className={`option ${selectedOptions["Tires"] === "Sport Tires" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Tires", "Sport Tires", DefaultImage)}
            >
              <span className="title">Sport Tires</span>
              <p className="description">Meets Precision, Every Turn.</p>
            </div>
            <div
              className={`option ${selectedOptions["Tires"] === "Winter Tires" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Tires", "Winter Tires", DefaultImage)}
            >
              <span className="title">Winter Tires</span>
              <p className="description">Grip the Frost, Drive with Force.</p>
            </div>
          </div>
        </section>

        {/* 座椅 */}
        <section className="selection-section">
          <h2>Seats</h2>
          <div className="options">
            <div
              className={`option ${selectedOptions["Seats"] === "Leather Seats" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Seats", "Leather Seats", DefaultImage)}
            >
              <span className="title">Leather Seats</span>
              <p className="description">Luxury at every turn.</p>
            </div>
            <div
              className={`option ${selectedOptions["Seats"] === "Sports Seats" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Seats", "Sports Seats", DefaultImage)}
            >
              <span className="title">Sports Seats</span>
              <p className="description">Grip the road, feel the thrill.</p>
            </div>
            <div
              className={`option ${selectedOptions["Seats"] === "Luxury Seats" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Seats", "Luxury Seats", DefaultImage)}
            >
              <span className="title">Luxury Seats</span>
              <p className="description">Where comfort meets elegance.</p>
            </div>
            <div
              className={`option ${selectedOptions["Seats"] === "Fabric Seats" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Seats", "Fabric Seats", DefaultImage)}
            >
              <span className="title">Fabric Seats</span>
              <p className="description">Cool comfort, all the way.</p>
            </div>
          </div>
        </section>

        {/* 导航 */}
        <section className="selection-section">
          <h2>Navigation</h2>
          <div className="options">
            <div
              className={`option ${selectedOptions["Navigation"] === "GPS" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Navigation", "GPS", DefaultImage)}
            >
              <span className="title">GPS</span>
              <p className="description">Speed, for every need.</p>
            </div>
            <div
              className={`option ${selectedOptions["Navigation"] === "GLONASS" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Navigation", "GLONASS", DefaultImage)}
            >
              <span className="title">GLONASS</span>
              <p className="description">Reliable and fast, navigates last.</p>
            </div>
            <div
              className={`option ${selectedOptions["Navigation"] === "Galile" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Navigation", "Galile", DefaultImage)}
            >
              <span className="title">Galile</span>
              <p className="description">Accurate and clear, guiding you near.</p>
            </div>
            <div
              className={`option ${selectedOptions["Navigation"] === "BeiDou" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Navigation", "BeiDou", DefaultImage)}
            >
              <span className="title">BeiDou</span>
              <p className="description">Quick and precise, journey with nice.</p>
            </div>
          </div>
        </section>

        {/* 内饰风格 */}
        <section className="selection-section">
          <h2>Style</h2>
          <div className="options">
            <div
              className={`option ${selectedOptions["Style"] === "Simple Style" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Style", "Simple Style", DefaultImage)}
            >
              <span className="title">Simple Style</span>
              <p className="description">Less is More, Elegantly Simple.</p>
            </div>
            <div
              className={`option ${selectedOptions["Style"] === "Luxury Style" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Style", "Luxury Style", DefaultImage)}
            >
              <span className="title">Luxury Style</span>
              <p className="description">Opulence Meets Elegance.</p>
            </div>
            <div
              className={`option ${selectedOptions["Style"] === "Sporty Style" ? "selected" : ""}`}
              onClick={() => handleOptionClick("Style", "Sporty Style", DefaultImage)}
            >
              <span className="title">Sporty Style</span>
              <p className="description">Dynamic Elegance, Pure Performance.</p>
            </div>
          </div>
        </section>

        {/* 配置总结 */}
        <div className="summary">
          <h2>Choosen Accessories</h2>
          <p id="summary-text">
            {Object.entries(selectedOptions).length > 0
              ? Object.entries(selectedOptions)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(" | ")
              : "Please select accessories"}
          </p>
          <button
            className="purchase-button"
            disabled={isPurchaseDisabled}
            onClick={handleSubmitPurchaseClick}
          >
            Order it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
