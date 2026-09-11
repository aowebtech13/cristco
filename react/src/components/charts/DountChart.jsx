import Chart from "react-apexcharts";

const DonutChart = () => {
  const options = {
    chart: {
      type: "donut",
      height: 180,
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
    labels: ["Grocery", "Shopping", "Health", "Rent"],
    colors: ["#90caf9", "#f4ff81", "#ce93d8", "#ba68c8"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "45%",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
  };

  const series = [56, 15, 56, 56];

  return (
    <div
      id="donut-1"
      className="donut-chart"
      style={{ height: 158, overflow: "hidden" }}
    >
      <Chart options={options} series={series} type="donut" height={156} />
    </div>
  );
};

export default DonutChart;
