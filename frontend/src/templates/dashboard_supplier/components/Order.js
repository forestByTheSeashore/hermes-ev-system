import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createPurchaseOrder } from '../../../api'; // 引入实际 API 方法

export default function PurchaseOrders() {
  const [dialogOpen, setDialogOpen] = useState(false); // 控制弹窗开关
  const [currentOrder, setCurrentOrder] = useState(null); // 当前编辑的订单

  const handleCreate = () => {
    setCurrentOrder({
      supplier_id: '',
      material_id: '',
      order_date: '',
      delivery_date: '',
      quantity: '',
      total_cost: '',
      status: 'Ordered',
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentOrder(null);
  };

  const handleDialogSubmit = async () => {
    try {
      const response = await createPurchaseOrder(currentOrder);
      if (response.data?.status === 'success') {
        alert('Order created successfully');
      } else {
        alert('Failed to create order: ' + response.data?.message || 'Unknown error');
      }
      handleDialogClose();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h2>Create Purchase Order</h2>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Order
      </Button>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create Order</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Supplier ID"
            type="number"
            fullWidth
            value={currentOrder?.supplier_id || ''}
            onChange={(e) => setCurrentOrder({ ...currentOrder, supplier_id: parseInt(e.target.value) || '' })}
          />
          <TextField
            margin="dense"
            label="Material ID"
            type="number"
            fullWidth
            value={currentOrder?.material_id || ''}
            onChange={(e) => setCurrentOrder({ ...currentOrder, material_id: parseInt(e.target.value) || '' })}
          />
          <TextField
            margin="dense"
            label="Order Date"
            type="text"
            fullWidth
            placeholder="YYYY-MM-DD"
            value={currentOrder?.order_date || ''}
            onChange={(e) => setCurrentOrder({ ...currentOrder, order_date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Delivery Date"
            type="text"
            fullWidth
            placeholder="YYYY-MM-DD"
            value={currentOrder?.delivery_date || ''}
            onChange={(e) => setCurrentOrder({ ...currentOrder, delivery_date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={currentOrder?.quantity || ''}
            onChange={(e) => setCurrentOrder({ ...currentOrder, quantity: parseInt(e.target.value) || '' })}
          />
          <TextField
            margin="dense"
            label="Total Cost"
            type="number"
            fullWidth
            value={currentOrder?.total_cost || ''}
            onChange={(e) => setCurrentOrder({ ...currentOrder, total_cost: parseInt(e.target.value) || '' })}
          />
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            value={currentOrder?.status || ''}
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
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
