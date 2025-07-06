// PurchaseDetailsTable.js
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getPurchaseDetails } from '../../../api';

const PurchaseDetailsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPurchaseDetails();
        if (response.status === 'success') {
          setData(response.data.purchase_details);
        }
      } catch (error) {
        console.error('Failed to fetch purchase details:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Purchase ID',
      dataIndex: 'purchase_id',
      key: 'purchase_id',
      sorter: (a, b) => a.purchase_id - b.purchase_id,
    },
    {
      title: 'Material ID',
      dataIndex: 'material_id',
      key: 'material_id',
      sorter: (a, b) => a.material_id - b.material_id,
    },
    {
      title: 'Supplier ID',
      dataIndex: 'supplier_id',
      key: 'supplier_id',
      sorter: (a, b) => a.supplier_id - b.supplier_id,
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: 'Delivery Date',
      dataIndex: 'delivery_date',
      key: 'delivery_date',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
    {
      title: 'Total Cost',
      dataIndex: 'total_cost',
      key: 'total_cost',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Ordered', value: 'Ordered' },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="purchase_id" />;
};

export default PurchaseDetailsTable;
