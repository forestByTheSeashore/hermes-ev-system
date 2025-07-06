import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { getVehicleInventory } from '../../../api';

export default function VehicleInventoryChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  const [inventoryData, setInventoryData] = useState([]);
  const [chartData, setChartData] = useState({ xAxisData: [], series: [] });

  useEffect(() => {
    getVehicleInventory()
      .then((response) => {
        if (response.data.status === 'success') {
          const data = response.data.data.inventory_data;
          processInventoryData(data);
        } else {
          console.error('Failed to fetch inventory data:', response.data.message);
        }
      })
      .catch((error) => console.error('Error fetching inventory data:', error));
  }, []);

  const processInventoryData = (data) => {
    const modelIds = [...new Set(data.map((item) => item.model_id))];
    const locations = [...new Set(data.map((item) => item.warehouse_location))];

    const series = modelIds.map((modelId) => {
      return {
        id: `model-${modelId}`,
        label: `Model ${modelId}`,
        data: locations.map((location) => {
          const matchingItem = data.find(
            (item) => item.model_id === modelId && item.warehouse_location === location
          );
          return matchingItem ? parseInt(matchingItem.total_stock, 10) : 0;
        }),
        stack: 'inventory',
      };
    });

    setChartData({ xAxisData: locations, series });
  };

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Vehicle Inventory
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Total inventory distribution across warehouses
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[{
            scaleType: 'band',
            categoryGapRatio: 0.5,
            data: chartData.xAxisData,
          }]}
          series={chartData.series}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: false,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
