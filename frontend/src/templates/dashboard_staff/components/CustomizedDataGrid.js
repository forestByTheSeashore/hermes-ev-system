import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getStoreAllInfo } from '../../../api'; // 引入 API 方法

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]); // 用于存储店铺订单数据
  const [columns] = useState([
    { field: 'store_id', headerName: 'Store ID', flex: 1 },
    { field: 'order_id', headerName: 'Order ID', flex: 1 },
    { field: 'order_date', headerName: 'Order Date', flex: 2 },
    { field: 'delivery_date', headerName: 'Delivery Date', flex: 2 },
    { field: 'total_amount', headerName: 'Total Amount', flex: 2 },
    { field: 'customer_id', headerName: 'Customer ID', flex: 2 },
    { field: 'customer_name', headerName: 'Customer Name', flex: 2 },
    { field: 'vehicle_id', headerName: 'Vehicle ID', flex: 2 },
    { field: 'vehicle_price', headerName: 'Vehicle Price', flex: 2 },
  ]);

  useEffect(() => {
    // 调用 API 获取数据
    getStoreAllInfo(2) // 示例：传入 salesmanId 为 2
      .then((response) => {
        if (response.data.status === 'success') {
          const data = response.data.data;
          // 为 DataGrid 添加 id 字段（DataGrid 需要唯一的 id 字段）
          setRows(data.map((item, index) => ({ ...item, id: index })));
        } else {
          console.error('Failed to fetch store orders:', response.data.message);
        }
      })
      .catch((error) => console.error('Error fetching store orders:', error));
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        checkboxSelection
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
      />
    </div>
  );
}
