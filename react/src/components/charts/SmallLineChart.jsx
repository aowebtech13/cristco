import React from "react";
import { smallChartOptions, smallChartSeries } from "@/data/chartOptions";

import Chart from "react-apexcharts";

const SmallLineChart = ({
  options = smallChartOptions,
  series = smallChartSeries,
}) => {
  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={28}
      width={"100%"}
    />
  );
};

export default SmallLineChart;
