import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getEmployees, updateEmployee, deleteEmployee } from '../../../api'; // 引入 API 方法
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]); // 用于存储员工数据
  const [columns] = useState([
    { field: 'EmployeeID', headerName: 'Employee ID', flex: 1 },
    { field: 'EmployeeName', headerName: 'Name', flex: 1 },
    { field: 'DepartmentName', headerName: 'Department', flex: 1 },
    { field: 'BranchName', headerName: 'Branch', flex: 1 },
    { field: 'PhoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'Salary', headerName: 'Salary', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleUpdate(params.row)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.EmployeeID)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 获取员工数据
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      if (response.data.status === 'success') {
        const data = response.data.data;
        setRows(data.map((item) => ({ ...item, id: item.EmployeeID }))); // 添加 id 字段
      } else {
        console.error('Failed to fetch employees:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // 更新员工信息
  const handleUpdate = async (employee) => {
    // 获取用户输入，并提供默认值
    const updatedData = {
      name: prompt('Enter new name:', employee.name) || employee.name,
      phone: prompt('Enter new phone number:', employee.phone) || employee.phone,
      salary: prompt('Enter new salary:', employee.salary) || employee.salary,
      branch_id: prompt('Enter branch ID:', employee.branch_id) || employee.branch_id,
      department_id: prompt('Enter department ID:', employee.department_id) || employee.department_id,
    };
  
    // 检查所有字段是否存在
    if (!updatedData.name || !updatedData.phone || !updatedData.salary || !updatedData.branch_id || !updatedData.department_id) {
      alert('All fields are required. Update operation aborted.');
      return;
    }
  
    try {
      // 调用 API 更新员工信息
      const response = await updateEmployee(employee.EmployeeID, updatedData);
      if (response.data.status === 'success') {
        alert('Employee updated successfully');
        fetchEmployees(); // 刷新数据
      } else {
        alert('Failed to update employee: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee: Server error.');
    }
  };
  

  // 删除员工信息
  const handleDelete = async (employeeID) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await deleteEmployee(employeeID);
        if (response.data.status === 'success') {
          alert('Employee deleted successfully');
          fetchEmployees(); // 刷新数据
        } else {
          alert('Failed to delete employee: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

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
