import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getMaterialInventory } from '../../../api'; // 引入新 API 方法

export default function MaterialInventoryDataGrid() {
  const [rows, setRows] = useState([]);

  // 根据你的数据结构定义列
  const [columns] = useState([
    { field: 'inventory_id', headerName: 'Inventory ID', flex: 1 },
    { field: 'material_id', headerName: 'Material ID', flex: 1 },
    { field: 'quantity_in_stock', headerName: 'Quantity in Stock', flex: 1, type: 'number' },
    { field: 'last_updated', headerName: 'Last Updated', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
  ]);

  useEffect(() => {
    // 调用 API 获取数据
    getMaterialInventory()
      .then((response) => {
        if (response.data.status === 'success') {
          const data = response.data.data.inventory_data;
          // 为 DataGrid 添加 id 字段，这里使用 inventory_id 作为 id
          setRows(data.map((item) => ({ ...item, id: item.inventory_id })));
        } else {
          console.error('Failed to fetch inventory data:', response.data.message);
        }
      })
      .catch((error) => console.error('Error fetching inventory data:', error));
  }, []);

  return (
    <div style={{ width: '100%' }}>
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
