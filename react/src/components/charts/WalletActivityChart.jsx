import Chart from "react-apexcharts";

const WalletActivityChart = () => {
  const options = {
    chart: {
      height: 337,
      type: "area",
      zoom: {
        enabled: false,
      },
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
    dataLabels: {
      enabled: false,
    },
    colors: ["#C388F7"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: "#A4A4A9",
        },
      },
      categories: [
        "02:00pm",
        "03:00pm",
        "04:00pm",
        "05:00pm",
        "06:00pm",
        "07:00pm",
        "08:00pm",
        "09:00pm",
      ],
    },
    tooltip: {
      enabled: true,
    },
  };

  const series = [
    {
      name: "$",
      data: [45, 52, 68, 75, 89, 93, 120, 145],
    },
  ];

  return (
    <div
      id="line-chart-1"
      className="line-chart "
      style={{ height: 337, overflow: "hidden" }}
    >
      <Chart options={options} series={series} type="area" height={337} />
    </div>
  );
};

export default WalletActivityChart;
