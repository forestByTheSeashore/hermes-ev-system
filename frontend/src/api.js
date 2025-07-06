import axios from 'axios';

const api = axios.create({
  baseURL: 'http://121.43.103.94', // 更改为你的实际基础 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Manager模块 API
export const getSalesData = () => api.get('/manager.php/sales'); // 获取销售数据概览
export const getProductionInfo = () => api.get('/manager.php/production'); // 获取工厂生产信息
export const getVehicleInventory = (location = 'ALL') => api.get(`/manager.php/inventory/${location}`); // 获取车型库存信息，默认 location 为 "ALL"
export const getEmployees = () => api.get('/manager.php/employees'); // 获取员工信息
export const updateEmployee = (id, data) => api.put(`/manager.php/employees/${id}`, data); // 更新员工信息
export const deleteEmployee = (id) => api.delete(`/manager.php/employees/${id}`); // 删除员工信息

// Salesman模块 API
export const getCustomerIDs = (salesmanId) => api.get(`/salesman.php/customers/2`); // 获取顾客 ID 列表
export const getStoreIDs = (salesmanId) => api.get(`/salesman.php/stores/2`); // 获取车辆 ID 列表
export const createOrder = (salesmanId, orderData) => api.post(`/salesman.php/createOrder/2`); // 创建新订单
export const getStoreAllInfo = (salesmanId) => api.get(`/salesman.php/storeAllInfo/2`); // 获取店铺内所有订单的详细数据


// // Supplier模块 API
// export const getSuppliers = () => api.get('/supplier.php/suppliers'); // 获取供应商列表
// export const getSupplierDetails = (id) => api.get(`/supplier.php/api/suppliers/${id}`); // 获取单个供应商详细信息
// export const createSupplier = (supplierData) => api.post('/supplier.php/api/suppliers', supplierData); // 创建供应商
// export const updateSupplier = (id, supplierData) => api.put(`/supplier.php/api/suppliers/${id}`, supplierData); // 更新供应商信息
// export const deleteSupplier = (id) => api.delete(`/supplier.php/api/suppliers/${id}`); // 删除供应商
// export const getSupplierMaterials = (id) => api.get(`/supplier.php/api/suppliers/${id}/materials`); // 获取供应商原材料库存
// export const getSupplierOrders = (id) => api.get(`/supplier.php/api/suppliers/${id}/orders`); // 获取供应商相关订单信息
// export const updateOrder = (orderId, orderData) => api.put(`/supplier.php/api/suppliers/orders/${orderId}`, orderData); // 更新订单信息
// export const deleteOrder = (orderId) => api.delete(`/supplier.php/api/suppliers/orders/${orderId}`); // 删除订单
// export const getSupplierComposition = (id) => api.get(`/supplier.php/api/suppliers/${id}/composition`); // 获取供应组成信息

// Inventory模块 API
export const getMaterialInventory = (filters) => api.get('/supplier.php/inventory', { params: filters }); // 查询原材料库存信息

// Purchase模块 API
export const getPurchaseDetails = () => api.get('/supplier.php/purchase&supplier-details'); // 获取采购详情
export const getPurchaseSummary = () => api.get('/supplier.php/purchase-summary'); // 获取采购汇总
export const createPurchaseOrder = (orderData) => api.post('/supplier.php/purchase', orderData); // 创建订单
export const updatePurchaseOrder = (purchaseId, orderData) =>
  api.put(`/supplier.php/purchase/${purchaseId}`, orderData); // 更新订单
export const deletePurchaseOrder = (purchaseId) => api.delete(`/supplier.php/purchase/${purchaseId}`); // 删除订单

export default api;
