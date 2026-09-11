import Chart from "react-apexcharts";

const CryptoStatistics = () => {
  const options = {
    chart: {
      height: 207,
      type: "line",
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
    legend: {
      show: false,
    },
    colors: ["#D4FE75", "#ffffff4d"],
    stroke: {
      curve: "smooth",
      width: 1,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: "#95989D",
        },
      },
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    tooltip: {
      enabled: true, // <-- FIXED
      theme: "light", // optional: you can set 'dark' or 'light'
    },
  };

  const series = [
    {
      name: "Item 01",
      data: [31, 90, 58, 70, 92, 89, 80],
    },
    {
      name: "Item 02",
      data: [51, 45, -25, 51, 34, 2, 41],
    },
  ];

  return (
    <div id="line-chart-twoline" style={{ height: 207, overflow: "hidden" }}>
      <Chart options={options} series={series} type="line" height={207} />
    </div>
  );
};

export default CryptoStatistics;
