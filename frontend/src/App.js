// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import DatabasePage from './pages/DatabasePage';
// import VehiclePage from './pages/VehiclePage';
// import Dashboard from './components/dashboard/Dashboard'; // 导入 Dashboard 组件
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav className="sidebar">
//           <ul>
//             <li><Link to="/">Database Management</Link></li>
//             <li><Link to="/vehicle">Vehicle Customization</Link></li>
//             <li><Link to="/dashboard">Dashboard</Link></li> {/* 添加新的 Dashboard 链接 */}
//           </ul>
//         </nav>

//         <div className="content">
//           <Routes>
//             <Route path="/" element={<DatabasePage />} />
//             <Route path="/vehicle" element={<VehiclePage />} />
//             <Route path="/dashboard" element={<Dashboard />} /> {/* 添加新的 Dashboard 路由 */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignInSide from './templates/sign-in-side/SignInSide'; // 导入 SignInSide 组件
import SignUp from './templates/sign-up/SignUp'; // 导入 SignUp 组件
import Dashboard from './templates/dashboard/Dashboard'; // 导入 Dashboard 组件
import Dashboard_staff from './templates/dashboard_staff/Dashboard_staff'; // 导入 Dashboard 组件
import './App.css';
import TestAPI from './TestAPI';
// Import all pages
import AccessoriesPage from './pages/AccessoriesPage';
import CompanyIntroductionPage from './pages/CompanyIntroductionPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import MainPage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProductIntroductionPage from './pages/ProductIntroductionPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import UserInfoPage from './pages/UserInfoPage';
import Dashboard_supplier from './templates/dashboard_supplier/Dashboard_supplier'; // 导入 Dashboard 组件

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/company-introduction" element={<CompanyIntroductionPage />} />
          <Route path="/vehicle-detail" element={<VehicleDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/product-introduction" element={<ProductIntroductionPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/test" element={<TestAPI />} />
          <Route path="/" element={<SignInSide />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> {/* 添加新的 Dashboard 路由 */}
          <Route path="/dashboard_staff" element={<Dashboard_staff />} /> {/* 添加新的 Dashboard 路由 */}
          <Route path="/dashboard_supplier" element={<Dashboard_supplier />} /> {/* 添加新的 Dashboard 路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

