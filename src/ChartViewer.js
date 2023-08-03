import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ApexCharts=()=> {

  //실시간 차트 체크 위해 더미데이터 만든 코드
  const [data, updateData] = useState([1, 2, 3, 4, 5, 6]);
    
  useEffect(() => {
  const interval = setInterval(() => {
    const val = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    let array = [...data, val];
    array.shift();
    updateData(array);
  }, 100);
  return () => {
    window.clearInterval(interval);
      };
  }, [data]);
  
  const series = [
    {
      name: "xx",
      data: data
    }
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    colors: ["#210124"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: true,
        gradientToColors: ["#DB162F"],
        opacityFrom: 1,
        opacityTo: 1,
        type: "vertical",
        stops: [0, 30]
      }
    }
  };
  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default React.memo(ApexCharts);