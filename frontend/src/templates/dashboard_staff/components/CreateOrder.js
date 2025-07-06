import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getCustomerIDs,
  getStoreIDs,
  createOrder,
} from '../../../api'; // 引入刚刚更新的 API 方法
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Stack,
} from '@mui/material';

const CreateOrder = () => {
  const [customerIDs, setCustomerIDs] = useState([]);
  const [storeIDs, setStoreIDs] = useState([]);
  const [orderData, setOrderData] = useState({
    order_id: '',
    customer_id: '',
    store_id: '',
    order_date: '',
    delivery_date: '',
    total_amount: '',
    status: 'Completed',
  });

  const salesmanId = 2; // 示例固定的 salesman_id

  // 获取顾客 ID 列表
  useEffect(() => {
    async function fetchCustomerIDs() {
      try {
        const response = await getCustomerIDs(salesmanId);
        setCustomerIDs(response.data.data);
      } catch (error) {
        console.error('Failed to fetch customer IDs:', error);
      }
    }

    async function fetchStoreIDs() {
      try {
        const response = await getStoreIDs(salesmanId);
        setStoreIDs(response.data.data);
      } catch (error) {
        console.error('Failed to fetch store IDs:', error);
      }
    }

    fetchCustomerIDs();
    fetchStoreIDs();
  }, [salesmanId]);

  const handleSubmit = async () => {
    try {
       // 确保 ID 是整数，金额是浮动数字，日期和状态是字符串
       const formattedData = {
        ...orderData,
        order_id: parseInt(orderData.order_id, 10),  // 确保转换为整数
        customer_id: parseInt(orderData.customer_id, 10), // 确保转换为整数
        store_id: parseInt(orderData.store_id, 10), // 确保转换为整数
        total_amount: parseFloat(orderData.total_amount).toFixed(2), // 保证总金额是浮动数字
        order_date: orderData.order_date, // 保留字符串格式的日期
        delivery_date: orderData.delivery_date, // 保留字符串格式的日期
        status: orderData.status, // 保留状态为字符串
      };
      alert(`订单数据：\n${JSON.stringify(formattedData, null, 2)}`);
      const response = await axios.post(
        `http://phphermesbackendv2-env.us-east-1.elasticbeanstalk.com/salesman.php/createOrder/${salesmanId}`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Response:', response.data);
      
      console.log("Order created:", response);  // 查看完整的响应数据
  
      if (response) {
        alert(`返回数据：\n${JSON.stringify(response.data, null, 2)}`);
        setOrderData({
          order_id: '',
          customer_id: '',
          store_id: '',
          order_date: '',
          delivery_date: '',
          total_amount: '',
          status: 'Completed',
        });
      } else {
        alert('订单创建失败，请稍后再试。');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('订单创建失败，请检查输入信息。');
    }
  };
  
  
  

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create Order
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Order ID"
          variant="outlined"
          value={orderData.order_id}
          onChange={(e) =>
            setOrderData({ ...orderData, order_id: e.target.value })
          }
        />
        <TextField
          select
          label="Customer ID"
          variant="outlined"
          value={orderData.customer_id}
          onChange={(e) =>
            setOrderData({ ...orderData, customer_id: e.target.value })
          }
        >
          {customerIDs.map((customer) => (
            <MenuItem key={customer.customer_id} value={customer.customer_id}>
              {customer.customer_id}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Store ID"
          variant="outlined"
          value={orderData.store_id}
          onChange={(e) =>
            setOrderData({ ...orderData, store_id: e.target.value })
          }
        >
          {storeIDs.map((store) => (
            <MenuItem key={store.store_id} value={store.store_id}>
              {store.store_id}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Order Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={orderData.order_date}
          onChange={(e) =>
            setOrderData({ ...orderData, order_date: e.target.value })
          }
        />
        <TextField
          label="Delivery Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={orderData.delivery_date}
          onChange={(e) =>
            setOrderData({ ...orderData, delivery_date: e.target.value })
          }
        />
        <TextField
          label="Total"
          variant="outlined"
          value={orderData.total_amount}
          onChange={(e) =>
            setOrderData({ ...orderData, total_amount: e.target.value })
          }
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Order
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateOrder;
