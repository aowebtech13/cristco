// app/components/BalanceOverviewChart.tsx

import Chart from "react-apexcharts";

const BalanceOverviewChart = () => {
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 10,
        animateGradually: {
          enabled: true,
          delay: 10,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 10,
        },
      },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#888",
          fontSize: "14px",
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#C388F7",
        },
      },
      bar: {
        columnWidth: "24px",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#888",
          fontSize: "14px",
        },
        formatter: function (value) {
          return value / 1000 + "k";
        },
      },
      min: 100000,
      max: 1000000,
    },
    grid: {
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    tooltip: {
      enabled: true,
      shared: true,
    },
  };

  const series = [
    {
      data: [
        { x: "06", y: [200000, 900000, 100000, 600000] },
        { x: "07", y: [300000, 600000, 200000, 400000] },
        { x: "08", y: [400000, 800000, 300000, 650000] },
        { x: "09", y: [200000, 700000, 400000, 500000] },
        { x: "10", y: [300000, 800000, 500000, 700000] },
        { x: "11", y: [400000, 900000, 600000, 800000] },
        { x: "12", y: [500000, 1000000, 700000, 900000] },
        { x: "13", y: [300000, 600000, 200000, 450000] },
        { x: "14", y: [400000, 900000, 300000, 800000] },
      ],
    },
  ];

  return (
    <div
      id="candlestick-2"
      className="candlestick-chart"
      style={{ height: 350, overflow: "hidden" }}
    >
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default BalanceOverviewChart;
