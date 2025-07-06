import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { getPurchaseDetails, updatePurchaseOrder, deletePurchaseOrder } from '../../../api'; // 引入 API 方法

export default function PurchaseDetailsDataGrid() {
  const [rows, setRows] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null); // 当前选中订单用于更新
  const [dialogOpen, setDialogOpen] = useState(false); // 控制更新弹窗

  const [columns] = useState([
    { field: 'material_id', headerName: 'Material ID', flex: 1 },
    { field: 'purchase_id', headerName: 'Purchase ID', flex: 1 },
    { field: 'supplier_id', headerName: 'Supplier ID', flex: 1 },
    { field: 'order_date', headerName: 'Order Date', flex: 1 },
    { field: 'delivery_date', headerName: 'Delivery Date', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1, type: 'number' },
    { field: 'unit_price', headerName: 'Unit Price', flex: 1, type: 'number' },
    { field: 'total_cost', headerName: 'Total Cost', flex: 1, type: 'number' },
    { field: 'status', headerName: 'Status', flex: 1 },
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
            onClick={() => handleDelete(params.row.purchase_id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ]);

  useEffect(() => {
    fetchPurchaseDetails();
  }, []);

  // 获取采购订单数据
  const fetchPurchaseDetails = async () => {
    try {
      const response = await getPurchaseDetails();
      if (response.data.status === 'success') {
        const data = response.data.data.purchase_details;
        setRows(data.map((item) => ({ ...item, id: item.purchase_id }))); // 使用 purchase_id 作为 id
      } else {
        console.error('Failed to fetch purchase details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching purchase details:', error);
    }
  };

  // 更新采购订单
  const handleUpdate = (order) => {
    setCurrentOrder(order); // 将当前订单数据设置到弹窗中
    setDialogOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await updatePurchaseOrder(currentOrder.purchase_id, currentOrder);
      if (response.data.status === 'success') {
        alert('Order updated successfully');
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.purchase_id === currentOrder.purchase_id ? { ...row, ...currentOrder } : row
          )
        );
        setDialogOpen(false); // 关闭弹窗
        setCurrentOrder(null);
      } else {
        alert('Failed to update order: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // 删除采购订单
  const handleDelete = async (purchaseId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await deletePurchaseOrder(purchaseId);
        if (response.data.status === 'success') {
          alert('Order deleted successfully');
          setRows((prevRows) => prevRows.filter((row) => row.purchase_id !== purchaseId));
        } else {
          alert('Failed to delete order: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

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

      {/* 更新弹窗 */}
      {currentOrder && (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Update Order</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Material ID"
              type="number"
              fullWidth
              value={currentOrder.material_id}
              onChange={(e) =>
                setCurrentOrder({ ...currentOrder, material_id: parseInt(e.target.value) || '' })
              }
            />
            <TextField
              margin="dense"
              label="Supplier ID"
              type="number"
              fullWidth
              value={currentOrder.supplier_id}
              onChange={(e) =>
                setCurrentOrder({ ...currentOrder, supplier_id: parseInt(e.target.value) || '' })
              }
            />
            <TextField
              margin="dense"
              label="Order Date"
              type="text"
              fullWidth
              placeholder="YYYY-MM-DD"
              value={currentOrder.order_date}
              onChange={(e) => setCurrentOrder({ ...currentOrder, order_date: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Delivery Date"
              type="text"
              fullWidth
              placeholder="YYYY-MM-DD"
              value={currentOrder.delivery_date}
              onChange={(e) => setCurrentOrder({ ...currentOrder, delivery_date: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              value={currentOrder.quantity}
              onChange={(e) =>
                setCurrentOrder({ ...currentOrder, quantity: parseInt(e.target.value) || '' })
              }
            />
            <TextField
              margin="dense"
              label="Total Cost"
              type="number"
              fullWidth
              value={currentOrder.total_cost}
              onChange={(e) =>
                setCurrentOrder({ ...currentOrder, total_cost: parseInt(e.target.value) || '' })
              }
            />
            <TextField
              margin="dense"
              label="Status"
              select
              fullWidth
              value={currentOrder.status}
              onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Ordered">Ordered</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
