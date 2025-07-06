import React, { useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// 注册所需的图表元素
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Charts = () => {
  // 饼状图数据
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  // 柱形图数据
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: '#4CAF50',
    }],
  };

  // 折线图数据
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Expenses',
      data: [300, 200, 400, 500, 600],
      fill: false,
      borderColor: '#FF5733',
      tension: 0.1,
    }],
  };

  // 销毁图表实例
  useEffect(() => {
    return () => {
      // 销毁之前的图表实例，防止重用canvas
      const charts = ChartJS.getChart('chart1');
      if (charts) charts.destroy();
    };
  }, []);

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Pie Chart</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart">
        <h3>Bar Chart</h3>
        <Bar data={barData} />
      </div>
      <div className="chart">
        <h3>Line Chart</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Charts;
