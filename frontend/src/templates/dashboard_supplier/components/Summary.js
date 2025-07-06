import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { getPurchaseSummary } from '../../../api'; // 引入 API 方法

const { Title, Text } = Typography;

export default function PurchaseSummaryCard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // 调用 API 获取数据
    getPurchaseSummary()
      .then((response) => {
        if (response.data.status === 'success') {
          setSummary(response.data.data.summary_data);
        } else {
          console.error('Failed to fetch purchase summary:', response.data.message);
        }
      })
      .catch((error) => console.error('Error fetching purchase summary:', error));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <Card title={<Title level={4}>Purchase Summary</Title>} bordered={true}>
        {summary ? (
          <div>
            <Text>Total Cost: </Text>
            <Text strong>${summary.total_cost_sum}</Text>
            <br />
            <Text>Non-Delivered Orders: </Text>
            <Text strong>{summary.non_delivered_count}</Text>
            <br />
            <Text>Latest Order Date: </Text>
            <Text strong>{summary.latest_order}</Text>
          </div>
        ) : (
          <Text>Loading...</Text>
        )}
      </Card>
    </div>
  );
}
