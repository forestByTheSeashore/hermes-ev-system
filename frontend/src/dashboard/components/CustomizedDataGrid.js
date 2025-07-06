import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getEmployees } from '../../../api'; // 引入 API 方法

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]); // 用于存储员工数据
  const [columns] = useState([
    { field: 'EmployeeID', headerName: 'Employee ID', flex: 1 },
    { field: 'EmployeeName', headerName: 'Name', flex: 1 },
    { field: 'DepartmentName', headerName: 'Department', flex: 1 },
    { field: 'BranchName', headerName: 'Branch', flex: 1 },
    { field: 'PhoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'Salary', headerName: 'Salary', flex: 1 },
  ]);

  useEffect(() => {
    // 调用 API 获取数据
    getEmployees()
      .then((response) => {
        if (response.data.status === 'success') {
          const data = response.data.data;
          // 为 DataGrid 添加 id 字段
          setRows(data.map((item) => ({ ...item, id: item.EmployeeID })));
        } else {
          console.error('Failed to fetch employees:', response.data.message);
        }
      })
      .catch((error) => console.error('Error fetching employees:', error));
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
