import Chart from "react-apexcharts";

const CryptoChart = () => {
  const options = {
    chart: {
      type: "bar",
      height: 87,

      stacked: true,
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
    plotOptions: {
      bar: {
        columnWidth: "55px",
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#161326", "#A4A4A9", "#FFFFFF"],
  };

  const series = [
    {
      name: "Base", // bottom layer (darkest color)
      data: [44, 55, 41, 67, 22, 43, 21, 44, 55, 41, 67],
    },
    {
      name: "Middle", // middle layer (grey color)
      data: [20, 18, 16, 20, 10, 18, 10, 15, 20, 16, 19],
    },
    {
      name: "Top", // top layer (lightest color)
      data: [8, 7, 6, 8, 5, 6, 5, 6, 7, 6, 7],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={87} />;
};

export default CryptoChart;
