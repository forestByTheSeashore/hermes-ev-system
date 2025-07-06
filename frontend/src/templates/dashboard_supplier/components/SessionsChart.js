import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { getSalesData } from '../../../api'; // 引入 API 方法

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function SessionsChart() {
  const theme = useTheme();
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSalesData();
        const sales = response.data.data.sales_by_model;

        // 转换 `month_sales` 字符串为数组
        const formattedSales = sales.map((item) => ({
          id: item.model_name,
          label: item.model_name,
          data: JSON.parse(item.month_sales),
        }));

        setSalesData(formattedSales);

        // 计算总销售额
        const total = sales.reduce((sum, model) => sum + model.annual_sales, 0);
        setTotalSales(total);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchData();
  }, []);

  const xAxisLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Sessions
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {totalSales.toLocaleString()}
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Monthly sales data by model
          </Typography>
        </Stack>
        <LineChart
          xAxis={[
            {
              scaleType: 'point',
              data: xAxisLabels,
              tickInterval: (index, i) => (i + 1) % 5 === 0, // 保持每五个月显示一个标签
            },
          ]}
          series={salesData}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': {
              fill: "url('#organic')",
            },
            '& .MuiAreaElement-series-referral': {
              fill: "url('#referral')",
            },
            '& .MuiAreaElement-series-direct': {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
