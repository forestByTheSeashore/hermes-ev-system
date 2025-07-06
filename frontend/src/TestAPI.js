import React, { useState } from 'react';
import {
  getSalesData,
  getProductionInfo,
  getVehicleInventory,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getCustomerIDs,
  getStoreIDs,
  createOrder,
  getMaterialInventory, // Inventory模块 API
  getPurchaseDetails, // Purchase模块 API
  getPurchaseSummary,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getStoreAllInfo, // Store all info API
} from './api'; // 导入所有 API 请求函数

const TestAPI = () => {
  const [salesData, setSalesData] = useState(null);
  const [productionData, setProductionData] = useState(null);
  const [vehicleInventory, setVehicleInventory] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [customerIDs, setCustomerIDs] = useState([]);
  const [storeIDs, setStoreIDs] = useState([]);
  const [storeAllInfo, setStoreAllInfo] = useState(null); // 新增状态：店铺内所有订单的详细信息
  const [orderCreationStatus, setOrderCreationStatus] = useState('');
  const [employeeUpdateStatus, setEmployeeUpdateStatus] = useState('');
  const [employeeDeleteStatus, setEmployeeDeleteStatus] = useState('');
  const [location, setLocation] = useState('ALL');
  const [materialInventory, setMaterialInventory] = useState(null); // 新增状态：原材料库存
  const [purchaseDetails, setPurchaseDetails] = useState(null); // 新增状态：采购详情
  const [purchaseSummary, setPurchaseSummary] = useState(null); // 新增状态：采购汇总
  const [purchaseOrderStatus, setPurchaseOrderStatus] = useState(''); // 新增状态：订单操作状态

  // 获取销售数据概览
  const fetchSalesData = async () => {
    try {
      const response = await getSalesData();
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data', error);
    }
  };

  // 获取工厂生产信息
  const fetchProductionData = async () => {
    try {
      const response = await getProductionInfo();
      setProductionData(response.data);
    } catch (error) {
      console.error('Error fetching production data', error);
    }
  };

  // 获取车型库存信息
  const fetchVehicleInventory = async () => {
    try {
      const response = await getVehicleInventory(location);
      setVehicleInventory(response.data);
    } catch (error) {
      console.error('Error fetching vehicle inventory', error);
    }
  };

  // 获取员工信息
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  // 获取顾客 ID 列表
  const fetchCustomerIDs = async () => {
    try {
      const response = await getCustomerIDs(2); // 示例 salesmanId
      setCustomerIDs(response.data);
    } catch (error) {
      console.error('Error fetching customer IDs', error);
    }
  };

  // 获取车辆 ID 列表
  const fetchStoreIDs = async () => {
    try {
      const response = await getStoreIDs(2); // 示例 salesmanId
      setStoreIDs(response.data);
    } catch (error) {
      console.error('Error fetching store IDs', error);
    }
  };

  // 获取店铺内所有订单的详细数据
  const fetchStoreAllInfo = async () => {
    try {
      const response = await getStoreAllInfo(2); // 示例 salesmanId
      setStoreAllInfo(response.data);
    } catch (error) {
      console.error('Error fetching store all info', error);
    }
  };

  // 创建订单
  const handleCreateOrder = async () => {
    const orderData = {
      customer_id: 1, // 示例客户 ID
      store_id: 1, // 示例车辆 ID
      order_details: {
        vehicle_type: 'SUV',
        quantity: 2,
        price: 25000,
      },
    };
    try {
      const response = await createOrder(2, orderData); // 示例 salesmanId
      setOrderCreationStatus(response.data.message);
    } catch (error) {
      console.error('Error creating order', error);
    }
  };

  // 获取原材料库存信息
  const fetchMaterialInventory = async () => {
    try {
      const response = await getMaterialInventory({ location: 'NY' }); // 示例过滤条件
      setMaterialInventory(response.data);
    } catch (error) {
      console.error('Error fetching material inventory', error);
    }
  };

  // 获取采购详情
  const fetchPurchaseDetails = async () => {
    try {
      const response = await getPurchaseDetails();
      setPurchaseDetails(response.data);
    } catch (error) {
      console.error('Error fetching purchase details', error);
    }
  };

  // 获取采购汇总
  const fetchPurchaseSummary = async () => {
    try {
      const response = await getPurchaseSummary();
      setPurchaseSummary(response.data);
    } catch (error) {
      console.error('Error fetching purchase summary', error);
    }
  };

  // 创建采购订单
  const handleCreatePurchaseOrder = async () => {
    const orderData = {
      material_id: 1,
      order_date: '2024-03-17',
      delivery_date: '2024-03-24',
      quantity: 100,
      total_cost: 5000,
      status: 'Ordered',
    };
    try {
      const response = await createPurchaseOrder(orderData);
      setPurchaseOrderStatus(response.data.message);
    } catch (error) {
      console.error('Error creating purchase order', error);
    }
  };

  // 更新采购订单
  const handleUpdatePurchaseOrder = async () => {
    const orderData = {
      order_date: '2024-03-18',
      delivery_date: '2024-03-25',
      quantity: 150,
      total_cost: 7500,
      status: 'In Transit',
    };
    try {
      const response = await updatePurchaseOrder(1, orderData); // 示例 purchaseId
      setPurchaseOrderStatus(response.data.message);
    } catch (error) {
      console.error('Error updating purchase order', error);
    }
  };

  // 删除采购订单
  const handleDeletePurchaseOrder = async () => {
    try {
      const response = await deletePurchaseOrder(1); // 示例 purchaseId
      setPurchaseOrderStatus(response.data.message);
    } catch (error) {
      console.error('Error deleting purchase order', error);
    }
  };

  return (
    <div>
      <h1>Test Manager API</h1>

      {/* 按钮操作区 */}
      <div>
        <button onClick={fetchSalesData}>Get Sales Data</button>
        <button onClick={fetchProductionData}>Get Production Data</button>
        <button onClick={fetchVehicleInventory}>Get Vehicle Inventory</button>
        <button onClick={fetchEmployees}>Get Employees</button>
        <button onClick={fetchCustomerIDs}>Get Customer IDs</button>
        <button onClick={fetchStoreIDs}>Get Store IDs</button>
        <button onClick={fetchStoreAllInfo}>Get Store All Info</button>
        <button onClick={handleCreateOrder}>Create Order</button>
        <button onClick={fetchMaterialInventory}>Get Material Inventory</button>
        <button onClick={fetchPurchaseDetails}>Get Purchase Details</button>
        <button onClick={fetchPurchaseSummary}>Get Purchase Summary</button>
        <button onClick={handleCreatePurchaseOrder}>Create Purchase Order</button>
        <button onClick={handleUpdatePurchaseOrder}>Update Purchase Order</button>
        <button onClick={handleDeletePurchaseOrder}>Delete Purchase Order</button>
      </div>

      {/* 数据展示区 */}
      <div>
        <h2>Sales Data</h2>
        <pre>{JSON.stringify(salesData, null, 2)}</pre>

        <h2>Production Data</h2>
        <pre>{JSON.stringify(productionData, null, 2)}</pre>

        <h2>Vehicle Inventory</h2>
        <pre>{JSON.stringify(vehicleInventory, null, 2)}</pre>

        <h2>Customer IDs</h2>
        <pre>{JSON.stringify(customerIDs, null, 2)}</pre>

        <h2>Store IDs</h2>
        <pre>{JSON.stringify(storeIDs, null, 2)}</pre>

        <h2>Store All Info</h2>
        <pre>{JSON.stringify(storeAllInfo, null, 2)}</pre>

        <h2>Order Creation Status</h2>
        <pre>{orderCreationStatus}</pre>

        <h2>Material Inventory</h2>
        <pre>{JSON.stringify(materialInventory, null, 2)}</pre>

        <h2>Purchase Details</h2>
        <pre>{JSON.stringify(purchaseDetails, null, 2)}</pre>

        <h2>Purchase Summary</h2>
        <pre>{JSON.stringify(purchaseSummary, null, 2)}</pre>

        <h2>Purchase Order Status</h2>
        <pre>{purchaseOrderStatus}</pre>
      </div>
    </div>
  );
};

export default TestAPI;
